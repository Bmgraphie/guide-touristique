import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GuideTouristique, LANGUES, REGIONS, STATUTS, NouveauGuide, Region, StatutGuide } from '../../models/guide-touristique';
import { GuideTouristiqueService } from '../../services/guide-touristique.service';
import { NotificationService } from '../../services/notification.service';
import { EMAIL, TELEPHONE_SN, emailUnique } from '../../validators/guide.validators';

/**
 * Écran « Ajouter » (/guides/nouveau) et « Modifier » (/guides/:id/modifier).
 * Un seul composant : s'il y a un id dans l'URL, le formulaire est pré-rempli.
 */
@Component({
  selector: 'app-guide-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './guide-form.html',
  styleUrl: './guide-form.css',
})
export class GuideForm {
  private readonly service = inject(GuideTouristiqueService);
  private readonly notification = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);

  // Listes pour les menus déroulants, cases et boutons radio
  protected readonly regions = REGIONS;
  protected readonly statuts = STATUTS;
  protected readonly langues = LANGUES;

  /** Id lu dans l'URL : null en mode ajout. */
  private readonly id: number | null = this.lireId(inject(ActivatedRoute).snapshot.paramMap.get('id'));

  /** Le guide à modifier (undefined en mode ajout, ou si l'id n'existe pas). */
  protected readonly guide: GuideTouristique | undefined = this.id === null ? undefined : this.service.getById(this.id);
  protected readonly modeEdition = this.id !== null;
  protected readonly introuvable = this.modeEdition && !this.guide;

  /** Message affiché en haut du formulaire quand on clique sur Enregistrer avec des erreurs. */
  protected erreurResume = '';

  /** Le formulaire réactif : chaque champ avec sa valeur de départ et ses validateurs. */
  protected readonly form = this.fb.group({
    prenom: ['', [Validators.required, Validators.minLength(2)]],
    nom: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.pattern(EMAIL), emailUnique((e) => this.service.emailDejaUtilise(e, this.id ?? undefined))]],
    telephone: ['', [Validators.required, Validators.pattern(TELEPHONE_SN)]],
    region: ['', Validators.required],
    specialite: ['', [Validators.required, Validators.minLength(3)]],
    note: [3, [Validators.min(0), Validators.max(5)]],
    statut: ['Disponible', Validators.required],
    langues: [['Français'] as string[]],
  });

  constructor() {
    // Mode modification : on remplit le formulaire avec les données du guide
    if (this.guide) {
      const { id, ...valeurs } = this.guide;
      this.form.setValue(valeurs);
    }
  }

  /** Retourne le message d'erreur d'un champ, ou '' s'il n'y en a pas (ou s'il n'a pas encore été touché). */
  protected erreur(champ: keyof typeof this.form.controls): string {
    const c = this.form.controls[champ];
    if (!c.errors || !(c.touched || c.dirty)) return '';
    const e = c.errors;
    const messages: Record<string, string> = {
      prenom: e['required'] ? 'Le prénom est obligatoire.' : 'Le prénom doit contenir au moins 2 caractères.',
      nom: e['required'] ? 'Le nom est obligatoire.' : 'Le nom doit contenir au moins 2 caractères.',
      email: e['required'] ? "L'e-mail est obligatoire."
        : e['emailPris'] ? 'Cette adresse est déjà utilisée par un autre guide.'
        : 'Saisissez une adresse e-mail valide (ex. nom@exemple.sn).',
      telephone: e['required'] ? 'Le téléphone est obligatoire.'
        : 'Numéro attendu : 9 chiffres commençant par 7 ou 3 (ex. 77 123 45 67).',
      region: 'Choisissez une région.',
      specialite: e['required'] ? 'La spécialité est obligatoire.' : 'La spécialité doit contenir au moins 3 caractères.',
      note: 'La note doit être comprise entre 0 et 5.',
      statut: 'Choisissez un statut.',
      langues: '',
    };
    return messages[champ];
  }

  /** Coche ou décoche une langue dans le tableau `langues`. */
  protected basculerLangue(langue: string, cochee: boolean): void {
    const actuelles = this.form.controls.langues.value;
    this.form.controls.langues.setValue(cochee ? [...actuelles, langue] : actuelles.filter((l) => l !== langue));
  }

  protected enregistrer(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // affiche toutes les erreurs d'un coup
      const nb = Object.values(this.form.controls).filter((c) => c.invalid).length;
      this.erreurResume = `Le formulaire contient ${nb} erreur${nb > 1 ? 's' : ''}. Corrigez les champs signalés.`;
      this.notification.erreur('Enregistrement impossible : vérifiez les champs signalés.');
      return;
    }
    this.erreurResume = '';

    const v = this.form.getRawValue();
    const data: NouveauGuide = {
      prenom: v.prenom.trim(),
      nom: v.nom.trim(),
      email: v.email.trim().toLowerCase(),
      telephone: v.telephone.trim(),
      region: v.region as Region,
      specialite: v.specialite.trim(),
      note: Math.round(Number(v.note) * 10) / 10,
      statut: v.statut as StatutGuide,
      langues: v.langues,
    };

    if (this.id !== null) {
      this.service.modifier({ ...data, id: this.id });
      this.notification.succes(`Fiche de ${data.prenom} ${data.nom} mise à jour.`);
    } else {
      this.service.ajouter(data);
      this.notification.succes(`${data.prenom} ${data.nom} a été ajouté(e) au répertoire.`);
    }
    this.router.navigate(['/guides']);
  }

  private lireId(brut: string | null): number | null {
    return brut === null ? null : Number(brut);
  }
}

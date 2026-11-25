import { Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GuideTouristique, REGIONS, STATUTS, StatutGuide } from '../../models/guide-touristique';
import { NotePipe } from '../../pipes/note.pipe';
import { GuideTouristiqueService } from '../../services/guide-touristique.service';
import { NotificationService } from '../../services/notification.service';

/** Enlève les accents et met en minuscules : « Kédougou » → « kedougou ». */
function normaliser(texte: string): string {
  return texte.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

/**
 * Écran « Répertoire » : tableau (ou cartes sur mobile), recherche, filtres,
 * tri, badges de statut, états vides et suppression avec confirmation.
 */
@Component({
  selector: 'app-guide-list',
  imports: [FormsModule, RouterLink, NotePipe],
  templateUrl: './guide-list.html',
  styleUrl: './guide-list.css',
})
export class GuideList {
  private readonly service = inject(GuideTouristiqueService);
  private readonly notification = inject(NotificationService);

  protected readonly regions = REGIONS;
  protected readonly statuts = STATUTS;

  // --- Critères choisis par l'utilisateur (des signaux) ---
  protected readonly recherche = signal('');
  protected readonly region = signal('');
  protected readonly statut = signal('');
  protected readonly tri = signal<'nom' | 'note'>('nom');
  protected readonly sens = signal<1 | -1>(1);

  // --- Valeurs calculées automatiquement dès qu'un critère ou la liste change ---
  protected readonly tous = this.service.tous;

  protected readonly guidesFiltres = computed(() => {
    const q = normaliser(this.recherche());
    const region = this.region();
    const statut = this.statut();
    const tri = this.tri();
    const sens = this.sens();

    return this.tous()
      .filter((g) => !q || [g.nom, g.prenom, g.specialite, `${g.prenom} ${g.nom}`].some((v) => normaliser(v).includes(q)))
      .filter((g) => !region || g.region === region)
      .filter((g) => !statut || g.statut === statut)
      .sort((a, b) =>
        tri === 'note'
          ? (a.note - b.note) * sens
          : (a.nom + a.prenom).localeCompare(b.nom + b.prenom, 'fr') * sens,
      );
  });

  protected readonly filtresActifs = computed(() => !!(this.recherche() || this.region() || this.statut()));

  protected readonly compteParStatut = computed(() => {
    const c: Record<StatutGuide, number> = { Disponible: 0, 'En mission': 0, Inactif: 0 };
    for (const g of this.tous()) c[g.statut]++;
    return c;
  });

  // --- Actions ---
  protected reinitialiser(): void {
    this.recherche.set('');
    this.region.set('');
    this.statut.set('');
  }

  protected trierPar(colonne: 'nom' | 'note'): void {
    if (this.tri() === colonne) {
      this.sens.update((s) => (s === 1 ? -1 : 1));
    } else {
      this.tri.set(colonne);
      this.sens.set(colonne === 'note' ? -1 : 1); // meilleures notes d'abord
    }
  }

  protected ariaSort(colonne: 'nom' | 'note'): 'ascending' | 'descending' | 'none' {
    if (this.tri() !== colonne) return 'none';
    return this.sens() === 1 ? 'ascending' : 'descending';
  }

  protected classeStatut(statut: StatutGuide): string {
    return statut === 'Disponible' ? 'badge-dispo' : statut === 'En mission' ? 'badge-mission' : 'badge-inactif';
  }

  // --- Suppression avec confirmation (boîte de dialogue <dialog>) ---
  private readonly dialogue = viewChild.required<ElementRef<HTMLDialogElement>>('confirmation');
  protected readonly aSupprimer = signal<GuideTouristique | null>(null);

  protected demanderSuppression(guide: GuideTouristique): void {
    this.aSupprimer.set(guide);
    this.dialogue().nativeElement.showModal();
  }

  protected confirmerSuppression(): void {
    const g = this.aSupprimer();
    if (g && this.service.supprimer(g.id)) {
      this.notification.succes(`Fiche de ${g.prenom} ${g.nom} supprimée.`);
    } else {
      this.notification.erreur('La suppression a échoué : ce guide n’existe plus.');
    }
    this.fermerDialogue();
  }

  protected fermerDialogue(): void {
    this.aSupprimer.set(null);
    this.dialogue().nativeElement.close();
  }
}

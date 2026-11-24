import { Injectable, computed, signal } from '@angular/core';
import { GUIDES_DEMO } from '../data/guides-demo';
import { GuideTouristique, NouveauGuide } from '../models/guide-touristique';

/**
 * Service central : c'est le SEUL endroit qui détient et modifie les guides.
 * Les composants ne se parlent jamais directement : ils passent tous par ici.
 * Pour brancher une API REST plus tard, seul ce fichier changera.
 */
@Injectable({ providedIn: 'root' })
export class GuideTouristiqueService {
  /** La liste des guides, gardée en mémoire dans un signal. */
  private readonly guides = signal<GuideTouristique[]>(structuredClone(GUIDES_DEMO));

  /** Lecture seule pour les composants : ils ne peuvent pas modifier la liste directement. */
  readonly tous = this.guides.asReadonly();

  /** Nombre total de guides, recalculé automatiquement. */
  readonly total = computed(() => this.guides().length);

  /** Retourne un guide par son id, ou undefined s'il n'existe pas. */
  getById(id: number): GuideTouristique | undefined {
    return this.guides().find((g) => g.id === id);
  }

  /** Ajoute un guide et lui attribue un nouvel id (le plus grand + 1). */
  ajouter(data: NouveauGuide): GuideTouristique {
    const id = this.guides().reduce((max, g) => Math.max(max, g.id), 0) + 1;
    const nouveau: GuideTouristique = { ...data, id };
    this.guides.update((liste) => [...liste, nouveau]);
    return nouveau;
  }

  /** Remplace le guide qui a le même id. Retourne false si l'id est introuvable. */
  modifier(guide: GuideTouristique): boolean {
    if (!this.getById(guide.id)) return false;
    this.guides.update((liste) => liste.map((g) => (g.id === guide.id ? { ...guide } : g)));
    return true;
  }

  /** Supprime le guide qui a cet id. Retourne false si l'id est introuvable. */
  supprimer(id: number): boolean {
    if (!this.getById(id)) return false;
    this.guides.update((liste) => liste.filter((g) => g.id !== id));
    return true;
  }

  /** Vrai si l'e-mail est déjà utilisé par un AUTRE guide (utile pour la validation du formulaire). */
  emailDejaUtilise(email: string, saufId?: number): boolean {
    const e = email.trim().toLowerCase();
    return this.guides().some((g) => g.email.toLowerCase() === e && g.id !== saufId);
  }

  /** Remet les données de démonstration. */
  reinitialiser(): void {
    this.guides.set(structuredClone(GUIDES_DEMO));
  }
}

import { Injectable, signal } from '@angular/core';

export interface Notification {
  texte: string;
  type: 'succes' | 'erreur';
}

/**
 * Affiche un message de succès ou d'erreur en bas de l'écran.
 * Le message reste visible même après un changement de page (ex. retour à la liste après un ajout).
 */
@Injectable({ providedIn: 'root' })
export class NotificationService {
  readonly message = signal<Notification | null>(null);
  private minuteur?: ReturnType<typeof setTimeout>;

  succes(texte: string): void {
    this.afficher({ texte, type: 'succes' });
  }

  erreur(texte: string): void {
    this.afficher({ texte, type: 'erreur' });
  }

  fermer(): void {
    this.message.set(null);
  }

  private afficher(n: Notification): void {
    this.message.set(n);
    clearTimeout(this.minuteur);
    this.minuteur = setTimeout(() => this.fermer(), 4000);
  }
}

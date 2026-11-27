import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NotificationService } from './services/notification.service';

/** Composant racine : barre latérale, en-tête, zone où le routeur affiche l'écran demandé + message flash. */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly titre = 'Guides touristiques du Sénégal';
  protected readonly notification = inject(NotificationService);

  /**
   * Lien d'évitement : place le focus clavier sur le contenu principal.
   * (Un simple href="#contenu" rechargerait la page à cause du <base href="/"> d'Angular.)
   */
  protected allerAuContenu(event: Event): void {
    event.preventDefault();
    document.getElementById('contenu')?.focus();
  }
}

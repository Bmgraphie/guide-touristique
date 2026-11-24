import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

/** Composant racine : en-tête + zone où le routeur affiche l'écran demandé. */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly titre = 'Guides touristiques du Sénégal';
}

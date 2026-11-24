import { Component, inject } from '@angular/core';
import { GuideTouristiqueService } from '../../services/guide-touristique.service';

/**
 * Écran « Répertoire ».
 * SQUELETTE de la séance commune : A le complète (tableau, recherche, filtres,
 * pipe de la note, badges, états vides, suppression avec confirmation).
 */
@Component({
  selector: 'app-guide-list',
  imports: [],
  templateUrl: './guide-list.html',
  styleUrl: './guide-list.css',
})
export class GuideList {
  private readonly service = inject(GuideTouristiqueService);
  protected readonly guides = this.service.tous;
}

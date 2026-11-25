import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formate une note sur 5.
 *   {{ 4.5 | note }}            → "4,5 / 5"
 *   {{ 4.5 | note:'etoiles' }}  → "★★★★★" (arrondi à l'entier le plus proche)
 */
@Pipe({ name: 'note' })
export class NotePipe implements PipeTransform {
  transform(valeur: number | null | undefined, format: 'texte' | 'etoiles' = 'texte'): string {
    if (valeur === null || valeur === undefined || isNaN(valeur)) return '';
    const note = Math.min(5, Math.max(0, valeur));
    if (format === 'etoiles') {
      const pleines = Math.round(note);
      return '★'.repeat(pleines) + '☆'.repeat(5 - pleines);
    }
    return note.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' / 5';
  }
}

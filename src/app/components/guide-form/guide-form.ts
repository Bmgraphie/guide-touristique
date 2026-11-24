import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { GuideTouristiqueService } from '../../services/guide-touristique.service';

/**
 * Écran « Ajouter » (/guides/nouveau) et « Modifier » (/guides/:id/modifier).
 * SQUELETTE de la séance commune : B le complète (Reactive Forms, validations, messages).
 */
@Component({
  selector: 'app-guide-form',
  imports: [RouterLink],
  templateUrl: './guide-form.html',
  styleUrl: './guide-form.css',
})
export class GuideForm {
  private readonly service = inject(GuideTouristiqueService);
  private readonly route = inject(ActivatedRoute);

  /** L'id présent dans l'URL, ou null en mode ajout. */
  private readonly id = toSignal(
    this.route.paramMap.pipe(map((p) => (p.has('id') ? Number(p.get('id')) : null))),
    { initialValue: null },
  );

  /** Le guide à modifier (undefined en mode ajout ou si l'id n'existe pas). */
  protected readonly guide = computed(() => {
    const id = this.id();
    return id === null ? undefined : this.service.getById(id);
  });

  protected readonly modeEdition = computed(() => this.id() !== null);
}

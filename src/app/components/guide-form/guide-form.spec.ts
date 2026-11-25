import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { GuideForm } from './guide-form';
import { GuideTouristiqueService } from '../../services/guide-touristique.service';

/** Crée le composant comme si l'URL contenait (ou non) un id. */
function creer(id: string | null) {
  TestBed.configureTestingModule({
    imports: [GuideForm],
    providers: [
      provideRouter([{ path: '**', children: [] }]),
      { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap(id ? { id } : {}) } } },
    ],
  });
  const fixture = TestBed.createComponent(GuideForm);
  fixture.detectChanges();
  return fixture;
}

describe('GuideForm', () => {
  it("en mode ajout, le formulaire vide est invalide", () => {
    const form = (creer(null).componentInstance as any).form;
    expect(form.invalid).toBe(true);
    expect(form.controls.prenom.hasError('required')).toBe(true);
  });

  it("refuse un e-mail mal formé et un téléphone incorrect", () => {
    const form = (creer(null).componentInstance as any).form;
    form.controls.email.setValue('pas-un-email');
    form.controls.telephone.setValue('12345');
    expect(form.controls.email.hasError('pattern')).toBe(true);
    expect(form.controls.telephone.hasError('pattern')).toBe(true);
    form.controls.telephone.setValue('77 123 45 67');
    expect(form.controls.telephone.valid).toBe(true);
  });

  it("refuse un e-mail déjà utilisé par un autre guide", () => {
    const form = (creer(null).componentInstance as any).form;
    form.controls.email.setValue('awa.ndiaye@exemple.sn');
    expect(form.controls.email.hasError('emailPris')).toBe(true);
  });

  it("en mode modification, pré-remplit le formulaire et accepte son propre e-mail", () => {
    const form = (creer('1').componentInstance as any).form;
    expect(form.controls.prenom.value).toBe('Awa');
    expect(form.controls.email.valid).toBe(true);
  });

  it("ajoute un guide quand le formulaire est valide", () => {
    const fixture = creer(null);
    const comp = fixture.componentInstance as any;
    comp.form.patchValue({
      prenom: 'Khady', nom: 'Gueye', email: 'khady.gueye@exemple.sn', telephone: '77 111 22 33',
      region: 'Kaolack', specialite: 'Gastronomie', note: 4, statut: 'Disponible',
    });
    comp.enregistrer();
    expect(TestBed.inject(GuideTouristiqueService).total()).toBe(9);
  });
});

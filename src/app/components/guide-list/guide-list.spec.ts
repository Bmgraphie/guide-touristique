import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GuideList } from './guide-list';

function creer() {
  TestBed.configureTestingModule({ imports: [GuideList], providers: [provideRouter([])] });
  const fixture = TestBed.createComponent(GuideList);
  fixture.detectChanges();
  return { fixture, comp: fixture.componentInstance as any };
}

describe('GuideList', () => {
  it('affiche les 8 guides de démonstration', () => {
    const { fixture } = creer();
    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(8);
  });

  it('cherche sans tenir compte des accents ni des majuscules', () => {
    const { comp } = creer();
    comp.recherche.set('ORNITHO');
    expect(comp.guidesFiltres().map((g: any) => g.nom)).toEqual(['Sarr']);
    comp.recherche.set('aissatou');
    expect(comp.guidesFiltres().length).toBe(1);
  });

  it('combine les filtres région et statut', () => {
    const { comp } = creer();
    comp.statut.set('Disponible');
    expect(comp.guidesFiltres().length).toBe(5);
    comp.region.set('Dakar');
    expect(comp.guidesFiltres().length).toBe(1);
  });

  it('affiche un message quand rien ne correspond', () => {
    const { fixture, comp } = creer();
    comp.recherche.set('zzzz');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Aucun guide ne correspond');
  });

  it('trie par note, la meilleure en premier', () => {
    const { comp } = creer();
    comp.trierPar('note');
    expect(comp.guidesFiltres()[0].nom).toBe('Faye');
  });
});

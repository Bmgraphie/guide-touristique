import { TestBed } from '@angular/core/testing';
import { GuideTouristiqueService } from './guide-touristique.service';

describe('GuideTouristiqueService', () => {
  let service: GuideTouristiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuideTouristiqueService);
  });

  it('démarre avec les 8 guides de démonstration', () => {
    expect(service.total()).toBe(8);
  });

  it('ajoute un guide avec un nouvel id', () => {
    const g = service.ajouter({
      prenom: 'Khady', nom: 'Gueye', email: 'khady.gueye@exemple.sn', telephone: '77 111 22 33',
      region: 'Kaolack', specialite: 'Gastronomie', langues: ['Français'], note: 4, statut: 'Disponible',
    });
    expect(g.id).toBe(9);
    expect(service.total()).toBe(9);
  });

  it('modifie et supprime un guide', () => {
    const awa = service.getById(1)!;
    expect(service.modifier({ ...awa, statut: 'Inactif' })).toBe(true);
    expect(service.getById(1)?.statut).toBe('Inactif');
    expect(service.supprimer(1)).toBe(true);
    expect(service.getById(1)).toBeUndefined();
  });

  it('détecte un e-mail déjà utilisé par un autre guide', () => {
    expect(service.emailDejaUtilise('AWA.NDIAYE@exemple.sn')).toBe(true);
    expect(service.emailDejaUtilise('awa.ndiaye@exemple.sn', 1)).toBe(false);
  });
});

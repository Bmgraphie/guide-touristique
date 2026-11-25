import { NotePipe } from './note.pipe';

describe('NotePipe', () => {
  const pipe = new NotePipe();

  it('formate la note avec une virgule et « / 5 »', () => {
    expect(pipe.transform(4.5)).toBe('4,5 / 5');
    expect(pipe.transform(4)).toBe('4,0 / 5');
  });

  it('affiche des étoiles arrondies', () => {
    expect(pipe.transform(4.6, 'etoiles')).toBe('★★★★★');
    expect(pipe.transform(3.9, 'etoiles')).toBe('★★★★☆');
  });

  it('renvoie une chaîne vide pour une valeur absente', () => {
    expect(pipe.transform(null)).toBe('');
  });
});

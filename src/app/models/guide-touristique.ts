/**
 * Modèle de données d'un guide touristique.
 * Une interface décrit la forme des données : elle n'existe qu'à la compilation.
 */

/** Les trois statuts possibles d'un guide. */
export type StatutGuide = 'Disponible' | 'En mission' | 'Inactif';

/** Les 14 régions du Sénégal. */
export const REGIONS = [
  'Dakar', 'Thiès', 'Saint-Louis', 'Ziguinchor', 'Kaolack', 'Fatick', 'Louga',
  'Diourbel', 'Matam', 'Tambacounda', 'Kédougou', 'Kolda', 'Sédhiou', 'Kaffrine',
] as const;
export type Region = (typeof REGIONS)[number];

export const STATUTS: readonly StatutGuide[] = ['Disponible', 'En mission', 'Inactif'];

export const LANGUES = ['Français', 'Wolof', 'Anglais', 'Pulaar', 'Sérère', 'Diola', 'Espagnol'] as const;

export interface GuideTouristique {
  id: number;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;   // ex. 77 123 45 67
  region: Region;
  specialite: string;  // ex. Histoire, Écotourisme
  langues: string[];   // ex. ['Français', 'Wolof']
  note: number;        // de 0 à 5
  statut: StatutGuide;
}

/** Données d'un nouveau guide : tout sauf l'id, que le service attribue. */
export type NouveauGuide = Omit<GuideTouristique, 'id'>;

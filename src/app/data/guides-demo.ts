import { GuideTouristique } from '../models/guide-touristique';

/**
 * Jeu de données de démonstration.
 * Toutes ces personnes sont FICTIVES : noms, e-mails et numéros sont inventés.
 */
export const GUIDES_DEMO: GuideTouristique[] = [
  { id: 1, prenom: 'Awa', nom: 'Ndiaye', email: 'awa.ndiaye@exemple.sn', telephone: '77 123 45 67', region: 'Saint-Louis', specialite: 'Histoire coloniale', langues: ['Français', 'Wolof', 'Anglais'], note: 4.6, statut: 'Disponible' },
  { id: 2, prenom: 'Moussa', nom: 'Diallo', email: 'moussa.diallo@exemple.sn', telephone: '78 234 56 78', region: 'Kédougou', specialite: 'Randonnée et cascades', langues: ['Français', 'Pulaar'], note: 4.8, statut: 'En mission' },
  { id: 3, prenom: 'Fatou', nom: 'Sarr', email: 'fatou.sarr@exemple.sn', telephone: '76 345 67 89', region: 'Fatick', specialite: 'Ornithologie (delta du Saloum)', langues: ['Français', 'Sérère', 'Anglais'], note: 4.3, statut: 'Disponible' },
  { id: 4, prenom: 'Ibrahima', nom: 'Faye', email: 'ibrahima.faye@exemple.sn', telephone: '70 456 78 90', region: 'Dakar', specialite: 'Patrimoine de Gorée', langues: ['Français', 'Wolof', 'Espagnol'], note: 4.9, statut: 'Disponible' },
  { id: 5, prenom: 'Mariama', nom: 'Badji', email: 'mariama.badji@exemple.sn', telephone: '77 567 89 01', region: 'Ziguinchor', specialite: 'Culture diola et Casamance', langues: ['Français', 'Diola'], note: 4.4, statut: 'En mission' },
  { id: 6, prenom: 'Cheikh', nom: 'Mbaye', email: 'cheikh.mbaye@exemple.sn', telephone: '33 822 10 20', region: 'Thiès', specialite: 'Artisanat et tapisserie', langues: ['Français', 'Wolof'], note: 3.9, statut: 'Inactif' },
  { id: 7, prenom: 'Aïssatou', nom: 'Ba', email: 'aissatou.ba@exemple.sn', telephone: '75 678 90 12', region: 'Tambacounda', specialite: 'Écotourisme Niokolo-Koba', langues: ['Français', 'Pulaar', 'Anglais'], note: 4.7, statut: 'Disponible' },
  { id: 8, prenom: 'Ousmane', nom: 'Sow', email: 'ousmane.sow@exemple.sn', telephone: '77 789 01 23', region: 'Louga', specialite: 'Désert de Lompoul', langues: ['Français', 'Wolof'], note: 4.1, statut: 'Disponible' },
];

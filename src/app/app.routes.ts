import { Routes } from '@angular/router';
import { GuideList } from './components/guide-list/guide-list';
import { GuideForm } from './components/guide-form/guide-form';

export const routes: Routes = [
  { path: '', redirectTo: 'guides', pathMatch: 'full' },
  { path: 'guides', component: GuideList, title: 'Répertoire des guides' },
  { path: 'guides/nouveau', component: GuideForm, title: 'Ajouter un guide' },
  { path: 'guides/:id/modifier', component: GuideForm, title: 'Modifier un guide' },
  { path: '**', redirectTo: 'guides' },
];

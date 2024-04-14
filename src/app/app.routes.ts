import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'cv/edit',
    loadComponent: () => import('./cv-edit/cv-edit.component'),
  },
  { path: '**', redirectTo: '/' },
];

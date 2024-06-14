import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    title: 'Бесплатный онлайн конструктор резюме',
  },
  {
    path: 'templates',
    loadComponent: () => import('./cv-templates/cv-templates.component'),
    title: 'Выбор шаблона для резюме | Бесплатный онлайн конструктор резюме',
  },
  {
    path: 'cv/edit',
    loadComponent: () => import('./cv-edit/cv-edit.component'),
    title:
      'Редактирование, просмотр и экспорт резюме | Бесплатный онлайн конструктор резюме',
  },
  { path: '**', redirectTo: '/' },
];

import { Routes } from '@angular/router';
import { INICIO_ROUTES } from './feactures/inicio/inicio.routes';
import { LOGIN_ROUTES } from './feactures/login/login.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  ...LOGIN_ROUTES,
  ...INICIO_ROUTES,

  {
    path: '**',
    redirectTo: 'login'
  }
];

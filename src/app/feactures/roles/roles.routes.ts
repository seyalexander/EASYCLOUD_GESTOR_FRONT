import { Routes } from '@angular/router';

export const ROLES_ROUTES: Routes = [
  {
    path:'roles',
    loadComponent: () => import('../roles/page/lista-rol-page/lista-rol-page').then(m => m.ListaRolPage)
  }
];

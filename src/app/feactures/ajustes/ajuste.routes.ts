import { Routes } from '@angular/router';

export const AJUSTES_ROUTES: Routes = [
  {
    path:'ajustes',
    loadComponent: () => import('../ajustes/page/lista-ajustes-page/lista-ajustes-page').then(m => m.ListaAjustesPage)
  }
];

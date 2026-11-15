import { Routes } from '@angular/router';

export const FAMILIA_ROUTES: Routes = [
  {
    path:'familia',
    loadComponent: () => import('../familia/page/lista-familia-page/lista-familia-page').then(m => m.ListaFamiliaPage)
  }
];

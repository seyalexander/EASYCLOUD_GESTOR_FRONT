import { Routes } from '@angular/router';

export const SUBFAMILIA_ROUTES: Routes = [
  {
    path:'subfamilia',
    loadComponent: () => import('../subFamilia/page/lista-subfamilia-page/lista-subfamilia-page').then(m => m.ListaSubfamiliaPage)
  }
];

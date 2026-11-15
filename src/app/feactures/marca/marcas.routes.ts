import { Routes } from '@angular/router';

export const MARCA_ROUTES: Routes = [
  {
    path:'marca',
    loadComponent: () => import('../marca/page/lista-marca-page/lista-marca-page').then(m => m.ListaMarcaPage)
  }
];

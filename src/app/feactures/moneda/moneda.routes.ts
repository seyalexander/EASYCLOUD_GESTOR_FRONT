import { Routes } from '@angular/router';

export const MONEDA_ROUTES: Routes = [
  {
    path:'moneda',
    loadComponent: () => import('../moneda/page/lista-moneda-page/lista-moneda-page').then(m => m.ListaMonedaPage)
  }
];

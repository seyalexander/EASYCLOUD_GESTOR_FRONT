import { Routes } from '@angular/router';

export const UNIDADMEDIDA_ROUTES: Routes = [
  {
    path:'unidad-medida',
    loadComponent: () => import('../unidadMedida/page/lista-unidad-medida-page/lista-unidad-medida-page').then(m => m.ListaUnidadMedidaPage)
  }
];

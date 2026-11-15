import { Routes } from '@angular/router';

export const LISTAPRECIOS_ROUTES: Routes = [
  {
    path:'lista-precios',
    loadComponent: () => import('../listaPrecios/page/lista-lista-precios-page/lista-lista-precios-page').then(m => m.ListaListaPreciosPage)
  }
];

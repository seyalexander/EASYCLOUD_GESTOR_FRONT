import { Routes } from '@angular/router';

export const EMPRESAS_ROUTES: Routes = [
  {
    path:'empresas',
    loadComponent: () => import('../empresa/page/lista-empresas-page/lista-empresas-page').then(m => m.ListaEmpresasPage)
  }
];

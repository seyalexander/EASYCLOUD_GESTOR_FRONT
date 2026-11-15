
import { Routes } from '@angular/router';

export const USUARIO_ROUTES: Routes = [
  {
    path:'usuarios',
    loadComponent: () => import('../usuario/page/lista-usuarios-page/lista-usuarios-page').then(m => m.ListaUsuariosPage)
  }
];

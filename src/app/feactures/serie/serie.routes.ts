
import { Routes } from '@angular/router';

export const SERIES_ROUTES: Routes = [
  {
    path:'series',
    loadComponent: () => import('../serie/page/lista-serie-page/lista-serie-page').then(m => m.ListaSeriePage)
  }
];

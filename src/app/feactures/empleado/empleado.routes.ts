import { Routes } from '@angular/router';

export const EMPLEADOS_ROUTES: Routes = [
  {
    path:'empleados',
    loadComponent: () => import('../empleado/page/lista-empleado-page/lista-empleado-page').then(m => m.ListaEmpleadoPage)
  }
];

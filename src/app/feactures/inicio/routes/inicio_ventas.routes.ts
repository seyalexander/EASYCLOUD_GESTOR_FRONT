import { Routes } from '@angular/router';
import { AJUSTES_ROUTES } from '../../ajustes/ajuste.routes';


export const INICIO_VENTAS_ROUTES: Routes = [
  {
    path:'ventas',
    children:[
      ...AJUSTES_ROUTES
    ]
  }
];

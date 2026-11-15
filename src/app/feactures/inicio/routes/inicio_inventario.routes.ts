import { Routes } from '@angular/router';
import { AJUSTES_ROUTES } from '../../ajustes/ajuste.routes';


export const INICIO_INVENTARIO_ROUTES: Routes = [
  {
    path:'inventario',
    children:[
      ...AJUSTES_ROUTES
    ]
  }
];

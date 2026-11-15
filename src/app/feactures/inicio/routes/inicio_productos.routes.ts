import { Routes } from '@angular/router';
import { FAMILIA_ROUTES } from '../../familia/familia.routes';
import { SUBFAMILIA_ROUTES } from '../../subFamilia/subfamilia.routes';
import { UNIDADMEDIDA_ROUTES } from '../../unidadMedida/unidadMedida.routes';

export const INICIO_PRODUCTOS_ROUTES: Routes = [
  {
    path:'productos',
    children:[
      ...FAMILIA_ROUTES,
      ...SUBFAMILIA_ROUTES,
      ...UNIDADMEDIDA_ROUTES
    ]
  }
];

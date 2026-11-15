import { Routes } from '@angular/router';
import { FAMILIA_ROUTES } from '../../familia/familia.routes';
import { SUBFAMILIA_ROUTES } from '../../subFamilia/subfamilia.routes';
import { UNIDADMEDIDA_ROUTES } from '../../unidadMedida/unidadMedida.routes';
import { MARCA_ROUTES } from '../../marca/marcas.routes';
import { LISTAPRECIOS_ROUTES } from '../../listaPrecios/listaPrecios.routes';

export const INICIO_PRODUCTOS_ROUTES: Routes = [
  {
    path:'productos',
    children:[
      ...FAMILIA_ROUTES,
      ...SUBFAMILIA_ROUTES,
      ...UNIDADMEDIDA_ROUTES,
      ...MARCA_ROUTES,
      ...LISTAPRECIOS_ROUTES
    ]
  }
];

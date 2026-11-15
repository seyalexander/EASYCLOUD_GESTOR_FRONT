import { Routes } from '@angular/router';
import { TIPODOCUMENTO_ROUTES } from '../../tipoDocumento/tipoDocumento.routes';
import { EMPRESAS_ROUTES } from '../../empresa/empresas.routes';
import { SERIES_ROUTES } from '../../serie/serie.routes';
import { MONEDA_ROUTES } from '../../moneda/moneda.routes';

export const INICIO_CONFIGURACIONES_ROUTES: Routes = [
  {
    path:'configuraciones',
    children:[
      ...TIPODOCUMENTO_ROUTES,
      ...EMPRESAS_ROUTES,
      ...MONEDA_ROUTES,
      ...SERIES_ROUTES,
    ]
  }
];

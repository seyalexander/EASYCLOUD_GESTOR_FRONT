
import { Routes } from '@angular/router';
import { DASHBOARD_ROUTES } from '../dashboard/dashboard.routes';
import { INICIO_USUARIOS_ROUTES } from './routes/inicio_usuarios.routes';
import { INICIO_CLIENTES_ROUTES } from './routes/inicio_clientes.routes';
import { INICIO_PRODUCTOS_ROUTES } from './routes/inicio_productos.routes';
import { INICIO_CONFIGURACIONES_ROUTES } from './routes/inicio_configuraciones.routes';
import { INICIO_INVENTARIO_ROUTES } from './routes/inicio_inventario.routes';
import { INICIO_VENTAS_ROUTES } from './routes/inicio_ventas.routes';
import { INICIO_PROMOCIONES_ROUTES } from './routes/inicio_promociones.routes';
import { INICIO_COMPRAS_ROUTES } from './routes/inicio_compras.routes';
import { INICIO_REPORTES_ROUTES } from './routes/inicio_reportes.routes';
import { INICIO_CAJA_ROUTES } from './routes/inicio_caja.routes';

export const INICIO_ROUTES: Routes = [
  {
    path:'inicio',
    loadComponent: () => import('../inicio/page/inicio-page/inicio-page').then(m => m.InicioPage),
    children: [
      ...DASHBOARD_ROUTES,
      ...INICIO_USUARIOS_ROUTES,
      ...INICIO_CLIENTES_ROUTES,
      ...INICIO_PRODUCTOS_ROUTES,
      ...INICIO_CONFIGURACIONES_ROUTES,
      ...INICIO_INVENTARIO_ROUTES,
      ...INICIO_VENTAS_ROUTES,
      ...INICIO_PROMOCIONES_ROUTES,
      ...INICIO_COMPRAS_ROUTES,
      ...INICIO_REPORTES_ROUTES,
      ...INICIO_CAJA_ROUTES,
    
    ]
  }
];

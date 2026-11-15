import { Routes } from '@angular/router';
import { USUARIO_ROUTES } from '../../usuario/usuario.routes';
import { ROLES_ROUTES } from '../../roles/roles.routes';
import { EMPLEADOS_ROUTES } from '../../empleado/empleado.routes';

export const INICIO_USUARIOS_ROUTES: Routes = [
  {
    path:'seguridad',
    children:[
      ...USUARIO_ROUTES,
      ...ROLES_ROUTES,
      ...EMPLEADOS_ROUTES,
    ]
  }
];

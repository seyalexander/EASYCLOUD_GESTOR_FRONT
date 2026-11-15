import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SeguridadService } from '../seguridad/seguridad-service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(SeguridadService);
  const router = inject(Router);

  // Verificamos si la URL es estrictamente una ruta de autenticación o login
  const esUrlAutenticacion = req.url.includes('/auth/login') || req.url.includes('/auth/Login');
  
  const token = authService.getToken();

  let clonedReq = req;
  if (token && !esUrlAutenticacion) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.error('Token inválido o expirado (401)');
        authService.logout();
        router.navigate(['/login']);
        alert('Tu sesión expiró. Por favor inicia sesión nuevamente.');
      }

      if (error.status === 403) {
        console.error('No autorizado (403)');
        authService.logout();
        router.navigate(['/login']);
        alert('Tu sesión expiró o no tienes permiso. Por favor inicia sesión nuevamente.');
      }

      if (error.status === 0) {
        console.error('Error de conexión con el servidor');
      }

      return throwError(() => error);
    })
  );
};
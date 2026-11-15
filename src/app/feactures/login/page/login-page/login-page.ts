import { Component } from '@angular/core';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { Toast } from 'primeng/toast';
import { RequestLogin } from '../../intercambios/request/RequestLogin.request';
import { SeguridadService } from '../../service/seguridad/seguridad-service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from "primeng/table";

@Component({
  selector: 'app-login-page',
  imports: [
    Password,
    Button,
    FormsModule,
    Toast,
    MessageModule,
    InputTextModule,
    TableModule
],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
  providers: [ConfirmationService, MessageService],
})
export class LoginPage {
  requestLogin: RequestLogin = {} as RequestLogin;

  login = {
    usuario: '',
    password: '',
  };

  loading = false;

  constructor(
    private messageService: MessageService,
    private readonly authService: SeguridadService,
    private readonly router: Router,
  ) {}

  loginUsuario() {
    if (!this.login.usuario || !this.login.password) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos requeridos',
        detail: 'Ingrese usuario y contraseña',
      });
      return;
    }

    this.loading = true;

    const loginRequest: RequestLogin = {
      usuario: this.login.usuario?.trim() ?? '',
      clave: this.login.password?.trim() ?? '',
    };

    this.authService
      .login(loginRequest)
      .pipe(
        catchError((error) => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error || 'Datos incorrectos',
          });
          return of(null);
        }),
      )
      .subscribe({
        next: (response) => {
          if (response?.exito) {
            sessionStorage.setItem('nombre', response?.nombre);
            sessionStorage.setItem('apellido', response?.apellido);
            sessionStorage.setItem('rol', response?.descripcionRol);

            this.router.navigate(['/inicio', 'DASHBOARD']);
          }

          if (!response?.exito) {
            this.loading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response?.message || 'Datos incorrectos',
            });
            this.router.navigate(['/login']);
          }
        },
        error: () => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error en la conexión con el servidor.',
          });
          this.router.navigate(['/login']);
        },
      });
  }
}

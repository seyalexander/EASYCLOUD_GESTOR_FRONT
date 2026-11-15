import { Component, inject } from '@angular/core';
import { LoginService } from '../../../login/service/login/login-service';

@Component({
  selector: 'app-dashboard-page',
  imports: [],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage {
  authService = inject(LoginService);

  usuarioLogueado: string = '';

  obtenerUsuarioLogueado(): void {
    const usuario = sessionStorage.getItem('nombre');
    if (usuario) {
      this.usuarioLogueado = usuario;
    } else {
      const admin = sessionStorage.getItem('rol');
      this.usuarioLogueado = admin || 'Usuario';
    }
  }

  ngOnInit(): void {
    this.obtenerUsuarioLogueado();
  }
}

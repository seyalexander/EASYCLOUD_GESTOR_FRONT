import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { RolService } from '../../service/api/rol-service';
import { RequestRegistrarRol } from '../../intercambios/request/RequestRegistroRol.request';
import { ResponseRegistrarRol } from '../../intercambios/response/ResponseRegistroRol.response';

@Component({
  selector: 'app-registrar-rol-page',
  imports: [
    AvatarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CommonModule,
    FormsModule,
    DialogModule,
    SelectModule,
    ToastModule,
    ToggleSwitchModule,
  ],
  templateUrl: './registrar-rol-page.html',
  styleUrl: './registrar-rol-page.css',
  providers: [MessageService],
})
export class RegistrarRolPage {
  @Input() visible: boolean = true;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onRegistroExitoso = new EventEmitter<void>();

  loading: boolean = false;
  rolService = inject(RolService);
  private messageService = inject(MessageService);

  rol = {
    descripcion: '',
  };

  guardar() {
    this.loading = true;

    const request: RequestRegistrarRol = {
      descripcion: this.rol.descripcion || '',
    };

    this.rolService.RegistrarRol(request).subscribe({
      next: (resp: ResponseRegistrarRol) => {
        this.loading = false;
        if (resp.exito) {
          this.resetFormulario();
          this.visibleChange.emit(false);
          this.onRegistroExitoso.emit();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: resp.message,
          });
        }
      },
      error: (err) => {
        this.loading = false;
        const mensaje = err?.error?.message || 'Error inesperado del servidor';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: mensaje,
        });
      },
    });
  }

  volverLista() {
    this.visibleChange.emit(false);
  }

  resetFormulario() {
    this.rol = {
      descripcion: '',
    };
  }
}

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
import { FamiliaService } from '../../services/api/familia-service';
import { RequestRegistrarFamilia } from '../../intercambios/request/RequestRegistrarFamilia.request';
import { ResponseRegistrarFanilia } from '../../intercambios/response/ResponseRegistrarFamilia.response';

@Component({
  selector: 'app-registrar-familia-page',
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
  templateUrl: './registrar-familia-page.html',
  styleUrl: './registrar-familia-page.css',
  providers: [MessageService],
})
export class RegistrarFamiliaPage {
  @Input() visible: boolean = true;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onRegistroExitoso = new EventEmitter<void>();

  loading: boolean = false;
  familiaService = inject(FamiliaService);
  private messageService = inject(MessageService);

  familia = {
    descripcion: '',
    imagenUrl: '',
  };

  guardar() {
    this.loading = true;

    const request: RequestRegistrarFamilia = {
      descripcion: this.familia.descripcion || '',
      imagenUrl: this.familia.imagenUrl || 'https://i.pinimg.com/736x/9d/9f/e0/9d9fe08a397670cf7aa24facaddcceee.jpg',
    };

    this.familiaService.RegistrarFamilia(request).subscribe({
      next: (resp: ResponseRegistrarFanilia) => {
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
    this.familia = {
      descripcion: '',
      imagenUrl: '',
    };
  }
}

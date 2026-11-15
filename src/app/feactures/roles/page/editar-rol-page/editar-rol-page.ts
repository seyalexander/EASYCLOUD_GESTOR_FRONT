import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Toast } from 'primeng/toast';
import { RolModel } from '../../model/rolModel.model';
import { RolService } from '../../service/api/rol-service';
import { RequestEditarAllRol } from '../../intercambios/request/RequestEditarAllRol.request';
import { ResponseEditarAllRol } from '../../intercambios/response/ResponseEditarAllRol.response';

@Component({
  selector: 'app-editar-rol-page',
  imports: [
    Dialog,
    ReactiveFormsModule,
    FormsModule,
    Select,
    Button,
    Toast,
    InputTextModule,
    FloatLabelModule,
  ],
  templateUrl: './editar-rol-page.html',
  styleUrl: './editar-rol-page.css',
  providers: [MessageService],
})
export class EditarRolPage {
  @Input() visibleEditar: boolean = true;
  @Output() visibleEditarChange = new EventEmitter<boolean>();
  @Input() rol: RolModel = new RolModel();
  @Output() onEditarExitoso = new EventEmitter<void>();

  rolService = inject(RolService);
  private messageService = inject(MessageService);

  loading: boolean = false;

  volverLista() {
    this.visibleEditarChange.emit(false);
  }

  rolEditar = {
    idRol: 0,
    descripcion: '',
    estado: 0,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rol'] && this.rolEditar) {
      this.rolEditar = {
        idRol: this.rol.idRol || 0,
        descripcion: this.rol.descripcion || '',
        estado: this.rol.estado || 0,
      };
    }
  }

  estadosRol = [
    { label: 'Inactivo', value: 0 },
    { label: 'Activo', value: 1 },
  ];

   editar() {
      this.loading = true;

      const request: RequestEditarAllRol = {
        idRol: this.rolEditar.idRol || 0,
        descripcion: this.rolEditar.descripcion || '',
        estado: this.rolEditar.estado || 0,
      };

      this.rolService.EditarAllRol(request).subscribe({
        next: (resp: ResponseEditarAllRol) => {
          this.loading = false;

          if (resp.exito) {
            this.resetFormulario();
            this.visibleEditarChange.emit(false);
            this.onEditarExitoso.emit();
            this.messageService.add({
              severity: 'success',
              summary: 'success',
              detail: resp.message,
            });
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


  resetFormulario() {
    this.rolEditar = {
      idRol: 0,
      descripcion: '',
      estado: 0,
    };
  }
}

import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Toast } from 'primeng/toast';
import { Dialog } from 'primeng/dialog';
import { EmpresaService } from '../../services/api/empresa-service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Card } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { Button } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RequestRegistroEmpresa } from '../../intercambios/request/RequestRegistroEmpresa.request';
import { ResponseRegistrEmpresa } from '../../intercambios/response/ResponseRegistroEmpresa.response';

@Component({
  selector: 'app-registrar-empresas-page',
  imports: [
    Toast,
    DividerModule,
    Dialog,
    CommonModule,
    FormsModule,
    InputTextModule,
    Card,
    FileUploadModule,
    Button,
  ],
  templateUrl: './registrar-empresas-page.html',
  styleUrl: './registrar-empresas-page.css',
  providers: [MessageService],
})
export class RegistrarEmpresasPage {
  @Input() visible: boolean = true;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onRegistroExitoso = new EventEmitter<void>();

  loading: boolean = false;
  empresaService = inject(EmpresaService);
  private messageService = inject(MessageService);

  empresa = {
    imagenUrl: '',
    razonSocial: '',
    ruc: '',
    direccion: '',
    telefono: '',
    email: '',
    logoUrl: '',
    estado: 0 as number | 0,
  };

  imageUrl: string | null = null;

  onUpload(event: any) {
    const file = event.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  removeImage() {
    this.imageUrl = null;
  }

  guardar() {

    this.loading = true;

    const request: RequestRegistroEmpresa = {
      imagenUrl: this.empresa.imagenUrl || '',
      razonSocial: this.empresa.razonSocial || '',
      ruc: this.empresa.ruc || '',
      direccion: this.empresa.direccion || '',
      telefono: this.empresa.telefono || '',
      email: this.empresa.email || '',
      logoUrl: this.empresa.logoUrl || '',
    };

    this.empresaService.RegistrarEmpresa(request).subscribe({
      next: (resp: ResponseRegistrEmpresa) => {

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
    this.empresa = {
      imagenUrl: '',
      razonSocial: '',
      ruc: '',
      direccion: '',
      telefono: '',
      email: '',
      logoUrl: '',
      estado: 0 as number | 0,
    };
  }
}

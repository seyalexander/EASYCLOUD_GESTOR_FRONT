import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { EmpresaModel } from '../../model/EmpresaModel.model';
import { Dialog } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Divider } from "primeng/divider";
import { Card } from "primeng/card";
import { FileUpload } from "primeng/fileupload";
import { CommonModule } from '@angular/common';
import { RequestEditarAllEmpresa } from '../../intercambios/request/RequestEditarAllEmpresa.request';
import { EmpresaService } from '../../services/api/empresa-service';
import { MessageService } from 'primeng/api';
import { ResponseEditarAllEmpresa } from '../../intercambios/response/ResponseEditarAllEmpresa.response';

@Component({
  selector: 'app-editar-empresas-page',
  imports: [Dialog,
    ReactiveFormsModule,
    FormsModule,
    Button,
    Toast,
    CommonModule,
    InputTextModule,
    FloatLabelModule, Divider, Card, FileUpload, Select],
  templateUrl: './editar-empresas-page.html',
  styleUrl: './editar-empresas-page.css',
  providers: [MessageService],
})
export class EditarEmpresasPage {
  @Input() visibleEditar: boolean = true;
  @Output() visibleEditarChange = new EventEmitter<boolean>();
  @Input() empresa: EmpresaModel = new EmpresaModel();
  @Output() onEditarExitoso = new EventEmitter<void>();

  empresaService = inject(EmpresaService);
  private messageService = inject(MessageService);

  loading: boolean = false;

  empresaEditar = {
    idEmpresa: 0,
    imagenUrl: '',
    razonSocial: '',
    ruc: '',
    direccion: '',
    telefono: '',
    email: '',
    logoUrl: '',
    estado: 0,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['empresa'] && this.empresa) {
      this.empresaEditar = {
        idEmpresa: this.empresa.idEmpresa || 0,
        imagenUrl: this.empresa.imagenUrl || '',
        razonSocial: this.empresa.razonSocial || '',
        ruc: this.empresa.ruc || '',
        direccion: this.empresa.direccion || '',
        telefono: this.empresa.telefono || '',
        email: this.empresa.email || '',
        logoUrl: this.empresa.logoUrl || '',
        estado: this.empresa.estado || 0,
      };
    }
  }

   estadosEmpresa = [
    { label: 'Inactivo', value: 0 },
    { label: 'Activo', value: 1 },
  ];

  editar() {
    this.loading = true;

    const request: RequestEditarAllEmpresa = {
        idEmpresa: this.empresaEditar.idEmpresa || 0,
        imagenUrl: this.empresaEditar.imagenUrl || '',
        razonSocial: this.empresaEditar.razonSocial || '',
        ruc: this.empresaEditar.ruc || '',
        direccion: this.empresaEditar.direccion || '',
        telefono: this.empresaEditar.telefono || '',
        email: this.empresaEditar.email || '',
        logoUrl: this.empresaEditar.logoUrl || '',
        estado: this.empresaEditar.estado || 0,
      };

      this.empresaService.EditarAllEmpresa(request).subscribe({
            next: (resp: ResponseEditarAllEmpresa) => {
              console.log(resp);

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

  volverLista() {
    this.visibleEditarChange.emit(false);
  }

  resetFormulario() {
    this.empresaEditar = {
    idEmpresa: 0,
    imagenUrl: '',
    razonSocial: '',
    ruc: '',
    direccion: '',
    telefono: '',
    email: '',
    logoUrl: '',
    estado: 0,
  };

  }
}

import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Toast } from 'primeng/toast';
import { MonedaModel } from '../../model/MonedaModel.model';
import { MessageService } from 'primeng/api';
import { MonedaService } from '../../service/api/moneda-service';
import { RequestEditarAllMoneda } from '../../intercambios/request/RequestEditarAllMoneda.request';
import { ResponseEditarAllMoneda } from '../../intercambios/response/ResponseEditarAllMoneda.response';

@Component({
  selector: 'app-editar-moneda-page',
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
  templateUrl: './editar-moneda-page.html',
  styleUrl: './editar-moneda-page.css',
  providers: [MessageService],
})
export class EditarMonedaPage {
  @Input() visibleEditar: boolean = true;
  @Output() visibleEditarChange = new EventEmitter<boolean>();
  @Input() moneda: MonedaModel = new MonedaModel();
  @Output() onEditarExitoso = new EventEmitter<void>();

  monedaService = inject(MonedaService);
  private messageService = inject(MessageService);

  loading: boolean = false;

  volverLista() {
    this.visibleEditarChange.emit(false);
  }

  monedaEditar = {
    idMoneda: 0,
    descripcion: '',
    simbolo: '',
    esPrincipal: 0,
    estado: 0,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['moneda'] && this.monedaEditar) {
      this.monedaEditar = {
        idMoneda: this.moneda.idMoneda || 0,
        descripcion: this.moneda.descripcion || '',
        simbolo: this.moneda.simbolo || '',
        esPrincipal: this.moneda.esPrincipal || 0,
        estado: this.moneda.estado || 0,
      };
    }
  }

  principalMoneda = [
    { label: 'No predeterminado', value: 0 },
    { label: 'Predeterminado', value: 1 },
  ];

  estadosMoneda = [
    { label: 'Inactivo', value: 0 },
    { label: 'Activo', value: 1 },
  ];

  editar() {
    this.loading = true;

    const request: RequestEditarAllMoneda = {
      idMoneda: this.monedaEditar.idMoneda || 0,
      descripcion: this.monedaEditar.descripcion || '',
      simbolo: this.monedaEditar.simbolo || '',
      esPrincipal: this.monedaEditar.esPrincipal || 0,
      estado: this.monedaEditar.estado || 0,
    };

    this.monedaService.EditarAllMoneda(request).subscribe({
      next: (resp: ResponseEditarAllMoneda) => {
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
    this.monedaEditar = {
      idMoneda: 0,
      descripcion: '',
      simbolo: '',
      esPrincipal: 0,
      estado: 0,
    };
  }
}

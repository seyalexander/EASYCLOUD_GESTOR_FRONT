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
import { MonedaService } from '../../service/api/moneda-service';
import { RequestRegistrarMoneda } from '../../intercambios/request/RequestRegistroMoneda.request';
import { ResponseRegistroMoneda } from '../../intercambios/response/ResponseRegistroMoneda.response';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-registro-moneda-page',
  imports: [
    AvatarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    SelectModule,
    ToastModule,
    ToggleSwitchModule,
  ],
  templateUrl: './registro-moneda-page.html',
  styleUrl: './registro-moneda-page.css',
  providers: [MessageService],
})
export class RegistroMonedaPage {
  @Input() visible: boolean = true;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onRegistroExitoso = new EventEmitter<void>();

  loading: boolean = false;
  monedaService = inject(MonedaService);
  private messageService = inject(MessageService);

  moneda = {
    descripcion: '',
    simbolo: '',
    esPrincipal: 0 as number | 0,
  };

  guardar() {
    this.loading = true;

    const request: RequestRegistrarMoneda = {
      descripcion: this.moneda.descripcion || '',
      simbolo: this.moneda.simbolo || '',
      esPrincipal: this.moneda.esPrincipal || 0,
    };

    this.monedaService.RegistrarMoneda(request).subscribe({
      next: (resp: ResponseRegistroMoneda) => {
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
    this.moneda = {
      descripcion: '',
      simbolo: '',
      esPrincipal: 0 as number | 0,
    };
  }
}

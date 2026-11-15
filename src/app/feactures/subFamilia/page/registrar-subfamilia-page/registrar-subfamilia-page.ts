import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select'; // O p-dropdown según tu versión de PrimeNG
import { MessageService } from 'primeng/api';
import { SubFamiliaModel } from '../../model/subFamiliaMode.model';
import { SubfamiliaService } from '../../services/api/subfamilia-service';
import { FamiliaService } from '../../../familia/services/api/familia-service';
import { FamiliaModel } from '../../../familia/model/familiaModel.model';
import { RequestRegistrarSubFamilia } from '../../intercambios/request/RequestRegistroSubFamilia.request';

@Component({
  selector: 'app-registrar-subfamilia-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    SelectModule
  ],
  templateUrl: './registrar-subfamilia-page.html',
  styleUrl: './registrar-subfamilia-page.css',
})
export class RegistrarSubfamiliaPage implements OnInit {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onRegistroExitoso = new EventEmitter<void>();

  private familiaService = inject(FamiliaService);
  private subFamiliaService = inject(SubfamiliaService);
  private messageService = inject(MessageService);

  subfamilia: SubFamiliaModel = new SubFamiliaModel();
  listaFamilias: FamiliaModel[] = [];

  ngOnInit(): void {
    this.cargarFamiliasActivas();
  }

  cargarFamiliasActivas() {
    // Listamos con estado = 1 para obtener solo las familias activas
    this.familiaService.ListarFamilias({ estado: 1 }).subscribe({
      next: (resp) => {
        if (resp.exito) {
          this.listaFamilias = resp.familia;
        }
      },
      error: (err) => {
        console.error('Error al listar familias activas', err);
      }
    });
  }

  volverLista() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.subfamilia = new SubFamiliaModel(); // Resetear formulario
  }

  guardar() {
    if (!this.subfamilia.idFamilia || !this.subfamilia.familiaDescripcion.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor completa la familia y la descripción.'
      });
      return;
    }

    // Asignamos una imagen por defecto si está vacía
    if (!this.subfamilia.imagenUrl) {
      this.subfamilia.imagenUrl = 'https://primefaces.org/cdn/primeng/images/product/bamboo-watch.jpg';
    }

    const request: RequestRegistrarSubFamilia = {
      idFamilia: this.subfamilia.idFamilia,
      subFamiliaDescripcion: this.subfamilia.familiaDescripcion || '',
      imagenUrl: this.subfamilia.imagenUrl || 'https://i.pinimg.com/736x/9d/9f/e0/9d9fe08a397670cf7aa24facaddcceee.jpg',
    };

    this.subFamiliaService.RegistrarSubFamilia(request).subscribe({
      next: (resp) => {
        if (resp.exito) {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Subfamilia registrada correctamente'
          });
          this.onRegistroExitoso.emit();
          this.volverLista();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: resp.message || 'No se pudo registrar la subfamilia'
          });
        }
      },
      error: (err) => {
        console.error('Error al registrar subfamilia', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error en el servidor'
        });
      }
    });
  }
}
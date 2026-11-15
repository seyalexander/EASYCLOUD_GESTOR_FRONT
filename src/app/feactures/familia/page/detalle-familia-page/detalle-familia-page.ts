import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ImageModule } from 'primeng/image';
import { FamiliaModel } from '../../model/familiaModel.model';

@Component({
  selector: 'app-detalle-familia-page',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    TagModule,
    ImageModule
  ],
  templateUrl: './detalle-familia-page.html',
  styleUrl: './detalle-familia-page.css',
})
export class DetalleFamiliaPage {
  @Input() visibleDetalle: boolean = false;
  @Output() visibleDetalleChange = new EventEmitter<boolean>();
  
  @Input() detalle: FamiliaModel = {} as FamiliaModel;

  onClose() {
    this.visibleDetalle = false;
    this.visibleDetalleChange.emit(this.visibleDetalle);
  }
}
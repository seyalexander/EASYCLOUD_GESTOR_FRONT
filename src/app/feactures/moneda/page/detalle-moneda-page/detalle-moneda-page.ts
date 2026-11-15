import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MonedaModel } from '../../model/MonedaModel.model';
import { Badge } from "primeng/badge";
import { Dialog } from "primeng/dialog";
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { Button } from "primeng/button";

@Component({
  selector: 'app-detalle-moneda-page',
  imports: [Button, Badge, Dialog, TimelineModule, CardModule, DividerModule],
  templateUrl: './detalle-moneda-page.html',
  styleUrl: './detalle-moneda-page.css',
})
export class DetalleMonedaPage {
  @Input() visibleDetalle: boolean = true;
  @Output() visibleDetalleChange  = new EventEmitter<boolean>();
  @Input() detalle: MonedaModel = new MonedaModel();


  volverLista() {
    this.visibleDetalleChange .emit(false);
  }
}

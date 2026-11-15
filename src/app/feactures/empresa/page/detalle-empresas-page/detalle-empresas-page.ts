import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmpresaModel } from '../../model/EmpresaModel.model';
import { Divider } from "primeng/divider";
import { Button } from "primeng/button";
import { Badge } from "primeng/badge";
import { Dialog } from "primeng/dialog";

@Component({
  selector: 'app-detalle-empresas-page',
  imports: [Divider, Button, Badge, Dialog],
  templateUrl: './detalle-empresas-page.html',
  styleUrl: './detalle-empresas-page.css',
})
export class DetalleEmpresasPage {
  @Input() visibleDetalle: boolean = true;
  @Output() visibleDetalleChange  = new EventEmitter<boolean>();
  @Input() detalle: EmpresaModel = new EmpresaModel();


  volverLista() {
    this.visibleDetalleChange .emit(false);
  }
}

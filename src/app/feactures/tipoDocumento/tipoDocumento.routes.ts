
import { Routes } from '@angular/router';

export const TIPODOCUMENTO_ROUTES: Routes = [
  {
    path:'tipoDocumento',
    loadComponent: () => import('../tipoDocumento/page/lista-tipo-documentos-page/lista-tipo-documentos-page').then(m => m.ListaTipoDocumentosPage)
  }
];

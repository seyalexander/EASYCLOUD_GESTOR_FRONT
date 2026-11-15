import { DetalleTipoDocumentosPage } from './../detalle-tipo-documentos-page/detalle-tipo-documentos-page';
import { TipoDocumentoModel } from './../../model/TipoDocumentoModel.model';
import { ChangeDetectorRef, Component, computed, inject, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { LoginService } from '../../../login/service/login/login-service';
import { CommonModule } from '@angular/common';
import { TipoDocumentoService } from '../../service/api/tipo-documento-service';
import { RequestListaTipoDocumento } from '../../intercambios/request/RequestListaTipoDocumento.request';
import { SkeletonModule } from 'primeng/skeleton';
import { BadgeModule } from 'primeng/badge';
import { RegistroTipoDocumentoPage } from '../registro-tipo-documento-page/registro-tipo-documento-page';
import { DialogModule } from 'primeng/dialog';
import { ResponseListaTipoDocumento } from '../../intercambios/response/ResponseListaTipoDocumento.response';
import { EditarTipoDocumentosPage } from '../editar-tipo-documentos-page/editar-tipo-documentos-page';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { ResponseEditarEstadoTipoDocumento } from '../../intercambios/response/ResponseEditarEstadoTipoDocumento.response';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-lista-tipo-documentos-page',
  imports: [
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    TableModule,
    SplitButtonModule,
    ToolbarModule,
    InputTextModule,
    CommonModule,
    SkeletonModule,
    BadgeModule,
    RegistroTipoDocumentoPage,
    DialogModule,
    ChipModule,
    TagModule,
    DetalleTipoDocumentosPage,
    EditarTipoDocumentosPage,
    ConfirmPopupModule,
    ToastModule,
    RippleModule,
    TooltipModule,
  ],
  templateUrl: './lista-tipo-documentos-page.html',
  styleUrl: './lista-tipo-documentos-page.css',
  providers: [ConfirmationService, MessageService],
})
export class ListaTipoDocumentosPage implements OnInit {
  items: MenuItem[] | undefined;

  // LISTA DATOS
  // private productService = inject(ProductService);
  tipoDocumentos: TipoDocumentoModel[] = [];
  detalleTipoDocumentosPage: TipoDocumentoModel = {} as TipoDocumentoModel;
  tipoDocumentoService = inject(TipoDocumentoService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  cdr = inject(ChangeDetectorRef);
  cols!: Column[];
  loading: boolean = true;

  // JALANDO ROL DEL LOGIN
  loginService = inject(LoginService);
  esSuperAdmin = computed(() => this.loginService.role() === 'SUPERADMIN');
  esAdmin = computed(() => ['ADMIN', 'SUPERADMIN'].includes(this.loginService.role()));

  // MOSTRAR REGISTRAR
  visible: boolean = false;
  // MOSTRAR DETALLE
  visibleDetalle: boolean = false;
  // MOSTRAR EDITAR
  visibleEditar: boolean = false;

  ngOnInit() {
    this.MostrarOpcionesCabecera();
    this.ObtenerListaTipoDocumentos(2);
  }

  MostrarOpcionesCabecera() {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => this.ObtenerListaTipoDocumentos(2),
      },
    ];
  }

  ObtenerListaTipoDocumentos(estado: number): void {
    this.loading = true;
    const request: RequestListaTipoDocumento = { estado };
    this.tipoDocumentoService.ListarTipoDocumentos(request).subscribe({
      next: (resp: ResponseListaTipoDocumento) => {
        console.log("tipo documentos:", resp);
        
        if (resp.exito) {
          this.tipoDocumentos = [...resp.tipoDocumentos];
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al listar tipos de documentos', err);
        this.loading = false;
      },
    });
  }

  ConfirmacionAnular(event: Event, tipoDocumento: TipoDocumentoModel) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: 'Está seguro de desactivar este tipo de documento?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.AnularTipoDocumento(tipoDocumento.idTipoDocumentos);
      },
      reject: () => {},
    });
  }

  ConfirmacionActivar(event: Event, tipoDocumento: TipoDocumentoModel) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: 'Está seguro de activar este tipo de documento?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'confirmed',
        severity: 'confirmed',
      },
      accept: () => {
        this.ActivarTipoDocumento(tipoDocumento.idTipoDocumentos);
      },
      reject: () => {},
    });
  }

  AnularTipoDocumento(idTipoDocumento: number) {
    this.loading = true;
    this.tipoDocumentoService.AnularTipoDocumento(idTipoDocumento).subscribe({
      next: (resp: ResponseEditarEstadoTipoDocumento) => {
        if (resp.exito) {
          this.messageService.add({
            severity: 'success',
            summary: 'Anulación correcta',
            detail: resp.message,
          });
          this.ObtenerListaTipoDocumentos(2);
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Error al anular tipo documento', err);
        this.loading = false;
      },
    });
  }

  ActivarTipoDocumento(idTipoDocumentos: number) {
    this.loading = true;
    this.tipoDocumentoService.ActivarTipoDocumento(idTipoDocumentos).subscribe({
      next: (resp: ResponseEditarEstadoTipoDocumento) => {
        if (resp.exito) {
          this.messageService.add({
            severity: 'success',
            summary: 'Activación correcta',
            detail: resp.message,
          });
          this.ObtenerListaTipoDocumentos(2);
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Error al activar tipo documento', err);
        this.loading = false;
      },
    });
  }

  refrescarLista() {
    this.ObtenerListaTipoDocumentos(2);
  }

  showDialog() {
    this.visible = true;
    this.cdr.detectChanges();
  }

  showDialogDetalle(detalle: TipoDocumentoModel) {
    this.detalleTipoDocumentosPage = detalle;
    this.visibleDetalle = true;
    this.cdr.detectChanges();
  }

  showDialogEditar(detalle: TipoDocumentoModel) {
    this.detalleTipoDocumentosPage = detalle;
    this.visibleEditar = true;
    this.cdr.detectChanges();
  }

  // VALIDACIÓN PERMISOS PARA CADA PROCESO
  puedeCrear = computed(() => ['SUPERADMIN', 'ADMIN'].includes(this.loginService.role()));
  puedeActualizar = computed(() => ['ADMIN'].includes(this.loginService.role()));
  puedeVerAuditoria = computed(() => this.loginService.role() === 'SUPERADMIN');
}

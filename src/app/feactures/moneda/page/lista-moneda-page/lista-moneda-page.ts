import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, computed, inject } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { MonedaModel } from '../../model/MonedaModel.model';
import { MonedaService } from '../../service/api/moneda-service';
import { LoginService } from '../../../login/service/login/login-service';
import { RequestListaMoneda } from '../../intercambios/request/RequestListaMoneda.request';
import { ResponseListaMoneda } from '../../intercambios/response/ResponseListaMoneda.response';
import { RegistroMonedaPage } from '../registro-moneda-page/registro-moneda-page';
import { ResponseEditarEstadoMoneda } from '../../intercambios/response/ResponseEditarEstadoMoneda.response';
import { ResponseEditarPredeterminadoMoneda } from '../../intercambios/response/ResponseEditarPredeterminadaMoneda.requet';
import { DetalleMonedaPage } from "../detalle-moneda-page/detalle-moneda-page";
import { EditarMonedaPage } from "../editar-moneda-page/editar-moneda-page";

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-lista-moneda-page',
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
    DialogModule,
    ChipModule,
    TagModule,
    ConfirmPopupModule,
    ToastModule,
    RippleModule,
    TooltipModule,
    RegistroMonedaPage,
    DetalleMonedaPage,
    EditarMonedaPage
],
  templateUrl: './lista-moneda-page.html',
  styleUrl: './lista-moneda-page.css',
  providers: [ConfirmationService, MessageService],
})
export class ListaMonedaPage {
  items: MenuItem[] | undefined;

  // LISTA DATOS
  monedas: MonedaModel[] = [];
  detalleMonedasPage: MonedaModel = {} as MonedaModel;
  monedasService = inject(MonedaService);
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
    this.ObtenerListaMonedas(2);
  }

  MostrarOpcionesCabecera() {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => this.ObtenerListaMonedas(2),
      },
    ];
  }

  ObtenerListaMonedas(estado: number): void {
    this.loading = true;
    const request: RequestListaMoneda = { estado };
    this.monedasService.ListarMoneda(request).subscribe({
      next: (resp: ResponseListaMoneda) => {
        if (resp.exito) {
          this.monedas = [...resp.monedas];
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al listar monedas', err);
        this.loading = false;
      },
    });
  }

  ConfirmacionAnular(event: Event, moneda: MonedaModel) {
    if (moneda.esPrincipal == 1) {
      this.confirmationService.confirm({
        target: event.currentTarget as EventTarget,
        message: `No puedes anular a la moneda predeterminada.`,
        icon: 'pi pi-info-circle',
        rejectVisible: false,
        acceptLabel: 'OK',
        accept: () => {},
      });
    } else {
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
          this.AnularMoneda(moneda.idMoneda);
        },
        reject: () => {},
      });
    }
  }

  ConfirmacionActivar(event: Event, moneda: MonedaModel) {
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
        this.ActivarMoneda(moneda.idMoneda);
      },
      reject: () => {},
    });
  }

  showDialogPredeterminado(event: Event, moneda: MonedaModel) {
    if (moneda.estado == 1) {
      this.confirmationService.confirm({
        target: event.currentTarget as EventTarget,
        message: `Está seguro de colocar como predeterminado a la moneda ${moneda.descripcion}?`,
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
          this.PredeterminadaMoneda(moneda.idMoneda);
        },
        reject: () => {},
      });
    } else {
      this.confirmationService.confirm({
        target: event.currentTarget as EventTarget,
        message: `Reactive la moneda para hacerla predeterminada.`,
        icon: 'pi pi-info-circle',
        rejectVisible: false,
        acceptLabel: 'OK',
        accept: () => {},
      });
    }
  }

  AnularMoneda(idMoneda: number) {
    this.loading = true;
    this.monedasService.AnularMoneda(idMoneda).subscribe({
      next: (resp: ResponseEditarEstadoMoneda) => {
        if (resp.exito) {
          this.messageService.add({
            severity: 'success',
            summary: 'Anulación correcta',
            detail: resp.message,
          });
          this.ObtenerListaMonedas(2);
        }
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
        });
        this.ObtenerListaMonedas(2);
        console.error('Error al anular tipo documento', err);
        this.loading = false;
      },
    });
  }

  ActivarMoneda(idMoneda: number) {
    this.loading = true;
    this.monedasService.ActivarMoneda(idMoneda).subscribe({
      next: (resp: ResponseEditarEstadoMoneda) => {
        if (resp.exito) {
          this.messageService.add({
            severity: 'success',
            summary: 'Activación correcta',
            detail: resp.message,
          });
          this.ObtenerListaMonedas(2);
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Error al activar tipo documento', err);
        this.loading = false;
      },
    });
  }

  PredeterminadaMoneda(idTipoDocumentos: number) {
    this.loading = true;
    this.monedasService.PredeterminadoMoneda(idTipoDocumentos).subscribe({
      next: (resp: ResponseEditarPredeterminadoMoneda) => {
        if (resp.exito) {
          this.messageService.add({
            severity: 'success',
            summary: 'Activación correcta',
            detail: resp.message,
          });
          this.ObtenerListaMonedas(2);
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
    this.ObtenerListaMonedas(2);
  }

  showDialog() {
    this.visible = true;
    this.cdr.detectChanges();
  }

  showDialogDetalle(detalle: MonedaModel) {
    this.detalleMonedasPage = detalle;
    this.visibleDetalle = true;
    this.cdr.detectChanges();
  }

  showDialogEditar(detalle: MonedaModel) {
    this.detalleMonedasPage = detalle;
    this.visibleEditar = true;
    this.cdr.detectChanges();
  }

  // VALIDACIÓN PERMISOS PARA CADA PROCESO
  puedeCrear = computed(() => ['SUPERADMIN', 'ADMIN'].includes(this.loginService.role()));
  puedeActualizar = computed(() => ['ADMIN'].includes(this.loginService.role()));
  puedeVerAuditoria = computed(() => this.loginService.role() === 'SUPERADMIN');
}

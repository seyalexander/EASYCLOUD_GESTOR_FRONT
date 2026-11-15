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
import { ImageModule } from 'primeng/image';
import { UnidadMedidaModel } from '../../model/UnidadMedidaModel.model';
import { UnidadMedidaService } from '../../services/api/unidad-medida-service';
import { LoginService } from '../../../login/service/login/login-service';
import { RequestListaUnidadMedida } from '../../intercambios/request/RequestListaUnidadMedida.request';
import { ResponseListaUnidadMedida } from '../../intercambios/response/ResponseListaUnidadMedida.response';
import { RegistroUnidadMedidaPage } from '../registro-unidad-medida-page/registro-unidad-medida-page';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-lista-unidad-medida-page',
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
    ImageModule,
    RegistroUnidadMedidaPage
],
  templateUrl: './lista-unidad-medida-page.html',
  styleUrl: './lista-unidad-medida-page.css',
  providers: [ConfirmationService, MessageService],
})
export class ListaUnidadMedidaPage {

  items: MenuItem[] | undefined;

  // LISTA DATOS
  // private productService = inject(ProductService);
  unidadesMedida: UnidadMedidaModel[] = [];
  detalleUnidadMedidaPage: UnidadMedidaModel = {} as UnidadMedidaModel;
  unidadMedidaService = inject(UnidadMedidaService);
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
    this.ObtenerListaUnidadMedida(2);
  }

  MostrarOpcionesCabecera() {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => this.ObtenerListaUnidadMedida(2),
      },
    ];
  }

   ObtenerListaUnidadMedida(estado: number): void {
    this.loading = true;
    const request: RequestListaUnidadMedida = { estado };
    this.unidadMedidaService.ListarUnidadMedida(request).subscribe({
      next: (resp: ResponseListaUnidadMedida) => {
        if (resp.exito) {
          this.unidadesMedida = [...resp.unidadesMedida];
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al listar familia', err);
        this.loading = false;
      },
    });
  }

  ConfirmacionAnular(event: Event, unidadMedida: UnidadMedidaModel) {
      this.confirmationService.confirm({
        target: event.currentTarget as EventTarget,
        message: `Está seguro de desactivar a la unidad de medida  ${unidadMedida.descripcion}?`,
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
          // this.AnularRol(rol.idRol);
        },
        reject: () => {},
      });
    }

    ConfirmacionActivar(event: Event, unidadMedida: UnidadMedidaModel) {
      this.confirmationService.confirm({
        target: event.currentTarget as EventTarget,
        message: `Está seguro de activar a la unidad de medida ${unidadMedida.descripcion}?`,
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
          // this.ActivarRol(rol.idRol);
        },
        reject: () => {},
      });
    }

    refrescarLista() {
    this.ObtenerListaUnidadMedida(2);
  }

  showDialog() {
    this.visible = true;
    this.cdr.detectChanges();
  }

  showDialogDetalle(detalle: UnidadMedidaModel) {
    this.detalleUnidadMedidaPage = detalle;
    this.visibleDetalle = true;
    this.cdr.detectChanges();
  }

  showDialogEditar(detalle: UnidadMedidaModel) {
    this.detalleUnidadMedidaPage = detalle;
    this.visibleEditar = true;
    this.cdr.detectChanges();
  }

  // VALIDACIÓN PERMISOS PARA CADA PROCESO
  puedeCrear = computed(() => ['SUPERADMIN', 'ADMIN'].includes(this.loginService.role()));
  puedeActualizar = computed(() => ['ADMIN'].includes(this.loginService.role()));
  puedeVerAuditoria = computed(() => this.loginService.role() === 'SUPERADMIN');
}

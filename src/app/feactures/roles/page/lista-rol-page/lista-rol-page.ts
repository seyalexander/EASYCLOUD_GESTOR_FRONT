import { ResponseEditarEstadoRol } from './../../intercambios/response/ResponseEditarEstadoRol.response';
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
import { RolModel } from '../../model/rolModel.model';
import { RolService } from '../../service/api/rol-service';
import { LoginService } from '../../../login/service/login/login-service';
import { RequestListaRol } from '../../intercambios/request/RequestListaRol.request';
import { ResponseListaRol } from '../../intercambios/response/ResponseListaRol.response';
import { RegistrarRolPage } from '../registrar-rol-page/registrar-rol-page';
import { DetalleRolPage } from '../detalle-rol-page/detalle-rol-page';
import { EditarRolPage } from '../editar-rol-page/editar-rol-page';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-lista-rol-page',
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
    RegistrarRolPage,
    DetalleRolPage,
    EditarRolPage,
  ],
  templateUrl: './lista-rol-page.html',
  styleUrl: './lista-rol-page.css',
  providers: [ConfirmationService, MessageService],
})
export class ListaRolPage {
  items: MenuItem[] | undefined;

  // LISTA DATOS
  // private productService = inject(ProductService);
  roles: RolModel[] = [];
  detalleRolesPage: RolModel = {} as RolModel;
  rolesService = inject(RolService);
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
    this.ObtenerListaRoles(2);
  }

  MostrarOpcionesCabecera() {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => this.ObtenerListaRoles(2),
      },
    ];
  }

  ObtenerListaRoles(estado: number): void {
    this.loading = true;
    const request: RequestListaRol = { estado };
    this.rolesService.ListarRoles(request).subscribe({
      next: (resp: ResponseListaRol) => {
        if (resp.exito) {
          this.roles = [...resp.roles];
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

  ConfirmacionAnular(event: Event, rol: RolModel) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: `Está seguro de desactivar el rol ${rol.descripcion}?`,
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
        this.AnularRol(rol.idRol);
      },
      reject: () => {},
    });
  }

  ConfirmacionActivar(event: Event, rol: RolModel) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: `Está seguro de activar el rol ${rol.descripcion}?`,
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
        this.ActivarRol(rol.idRol);
      },
      reject: () => {},
    });
  }

  AnularRol(idRol: number) {
    this.loading = true;
    this.rolesService.AnularRol(idRol).subscribe({
      next: (resp: ResponseEditarEstadoRol) => {
        if (resp.exito) {
          this.messageService.add({
            severity: 'success',
            summary: 'Anulación correcta',
            detail: resp.message,
          });
          this.ObtenerListaRoles(2);
        }
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
        });
        this.ObtenerListaRoles(2);
        console.error('Error al anular tipo documento', err);
        this.loading = false;
      },
    });
  }

  ActivarRol(idRol: number) {
    this.loading = true;
    this.rolesService.ActivarRol(idRol).subscribe({
      next: (resp: ResponseEditarEstadoRol) => {
        if (resp.exito) {
          this.messageService.add({
            severity: 'success',
            summary: 'Activación correcta',
            detail: resp.message,
          });
          this.ObtenerListaRoles(2);
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
    this.ObtenerListaRoles(2);
  }

  showDialog() {
    this.visible = true;
    this.cdr.detectChanges();
  }

  showDialogDetalle(detalle: RolModel) {
    this.detalleRolesPage = detalle;
    this.visibleDetalle = true;
    this.cdr.detectChanges();
  }

  showDialogEditar(detalle: RolModel) {
    this.detalleRolesPage = detalle;
    this.visibleEditar = true;
    this.cdr.detectChanges();
  }

  // VALIDACIÓN PERMISOS PARA CADA PROCESO
  puedeCrear = computed(() => ['SUPERADMIN', 'ADMIN'].includes(this.loginService.role()));
  puedeActualizar = computed(() => ['ADMIN'].includes(this.loginService.role()));
  puedeVerAuditoria = computed(() => this.loginService.role() === 'SUPERADMIN');
}

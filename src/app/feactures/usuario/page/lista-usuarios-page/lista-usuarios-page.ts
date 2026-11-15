import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, computed, inject } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { UsuarioModel } from '../../model/usuarioModel.model';
import { UsuarioService } from '../../service/api/usuario-service';
import { LoginService } from '../../../login/service/login/login-service';
import { RequestListarUsuario } from '../../intercambios/request/RequestListarUsuarios.request';
import { ResponseListaUsuarios } from '../../intercambios/response/ResponsetListarUsuarios.response';
import { RegistroUsuariosPage } from "../registro-usuarios-page/registro-usuarios-page";

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-lista-usuarios-page',
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
    RegistroUsuariosPage
],
  templateUrl: './lista-usuarios-page.html',
  styleUrl: './lista-usuarios-page.css',
  providers: [ConfirmationService, MessageService],
})
export class ListaUsuariosPage {
  items: MenuItem[] | undefined;

  // LISTA DATOS
  // private productService = inject(ProductService);
  usuarios: UsuarioModel[] = [];
  detalleUsuarioPage: UsuarioModel = {} as UsuarioModel;
  usuarioService = inject(UsuarioService);
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
    this.ObtenerListaUsuarios(2);
  }

  MostrarOpcionesCabecera() {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => this.ObtenerListaUsuarios(2),
      },
    ];
  }

  ObtenerListaUsuarios(estado: number): void {
    this.loading = true;
    const request: RequestListarUsuario = { estado };
    this.usuarioService.ListarUsuarios(request).subscribe({
      next: (resp: ResponseListaUsuarios) => {
        if (resp.exito) {
          this.usuarios = [...resp.usuarios];
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al listar usuarios', err);
        this.loading = false;
      },
    });
  }

  ConfirmacionAnular(event: Event, usuario: UsuarioModel) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: `Está seguro de desactivar al usuario ${usuario.nombre} ${usuario.apellido}?`,
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

  ConfirmacionActivar(event: Event, usuario: UsuarioModel) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: `Está seguro de activar al usuario ${usuario.nombre} ${usuario.apellido}?`,
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
    this.ObtenerListaUsuarios(2);
  }

  showDialog() {
    this.visible = true;
    this.cdr.detectChanges();
  }

  showDialogDetalle(detalle: UsuarioModel) {
    this.detalleUsuarioPage = detalle;
    this.visibleDetalle = true;
    this.cdr.detectChanges();
  }

  showDialogEditar(detalle: UsuarioModel) {
    this.detalleUsuarioPage = detalle;
    this.visibleEditar = true;
    this.cdr.detectChanges();
  }

  // VALIDACIÓN PERMISOS PARA CADA PROCESO
  puedeCrear = computed(() => ['SUPERADMIN', 'ADMIN'].includes(this.loginService.role()));
  puedeActualizar = computed(() => ['ADMIN'].includes(this.loginService.role()));
  puedeVerAuditoria = computed(() => this.loginService.role() === 'SUPERADMIN');
}

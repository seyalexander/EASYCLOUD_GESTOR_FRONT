import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, computed, inject } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { ImageModule } from 'primeng/image';
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
import { SubFamiliaModel } from '../../model/subFamiliaMode.model';
import { SubfamiliaService } from '../../services/api/subfamilia-service';
import { LoginService } from '../../../login/service/login/login-service';
import { RequestListaSubFamilia } from '../../intercambios/request/RequestListaSubFamilia.request';
import { ResponseListaSubFamilia } from '../../intercambios/response/ResponseListaSubFamilia.response';
import { RegistrarSubfamiliaPage } from '../registrar-subfamilia-page/registrar-subfamilia-page';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-lista-subfamilia-page',
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
    RegistrarSubfamiliaPage
],
  templateUrl: './lista-subfamilia-page.html',
  styleUrl: './lista-subfamilia-page.css',
  providers: [ConfirmationService, MessageService],
})
export class ListaSubfamiliaPage {
  items: MenuItem[] | undefined;

  // LISTA DATOS
  // private productService = inject(ProductService);
  subfamilias: SubFamiliaModel[] = [];
  detalleSubFamiliaPage: SubFamiliaModel = {} as SubFamiliaModel;
  subFamiliaService = inject(SubfamiliaService);
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
    this.ObtenerListaSubFamilias(2, 0);
  }

  MostrarOpcionesCabecera() {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => this.ObtenerListaSubFamilias(2, 0),
      },
    ];
  }

  ObtenerListaSubFamilias(estado: number, idFamilia: number): void {
    this.loading = true;
    const request: RequestListaSubFamilia = { estado, idFamilia };
    this.subFamiliaService.ListarSubFamilias(request).subscribe({
      next: (resp: ResponseListaSubFamilia) => {
        if (resp.exito) {
          this.subfamilias = [...resp.subfamilias];
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al listar las subfamilias', err);
        this.loading = false;
      },
    });
  }

  ConfirmacionAnular(event: Event, subfamilia: SubFamiliaModel) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: `Está seguro de desactivar a la sub familia ${subfamilia.familiaDescripcion}?`,
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
      reject: () => { },
    });
  }

  ConfirmacionActivar(event: Event, subfamilia: SubFamiliaModel) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: `Está seguro de activar a la sub familia ${subfamilia.familiaDescripcion}?`,
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
      reject: () => { },
    });
  }


  showDialog() {
    this.visible = true;
    this.cdr.detectChanges();
  }

  showDialogDetalle(detalle: SubFamiliaModel) {
    this.detalleSubFamiliaPage = detalle;
    this.visibleDetalle = true;
    this.cdr.detectChanges();
  }

  showDialogEditar(detalle: SubFamiliaModel) {
    this.detalleSubFamiliaPage = detalle;
    this.visibleEditar = true;
    this.cdr.detectChanges();
  }

  // VALIDACIÓN PERMISOS PARA CADA PROCESO
  puedeCrear = computed(() => ['SUPERADMIN', 'ADMIN'].includes(this.loginService.role()));
  puedeActualizar = computed(() => ['ADMIN'].includes(this.loginService.role()));
  puedeVerAuditoria = computed(() => this.loginService.role() === 'SUPERADMIN');
}

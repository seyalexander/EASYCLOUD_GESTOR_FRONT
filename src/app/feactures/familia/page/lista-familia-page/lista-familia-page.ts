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
import { FamiliaModel } from '../../model/familiaModel.model';
import { FamiliaService } from '../../services/api/familia-service';
import { LoginService } from '../../../login/service/login/login-service';
import { RequestListarFamilias } from '../../intercambios/request/RequestListarFamilias.request';
import { ResponseListarFamilia } from '../../intercambios/response/ResponseListarFamilias.response';
import { RegistrarFamiliaPage } from '../registrar-familia-page/registrar-familia-page';
import { ImageModule } from 'primeng/image';
import { DetalleFamiliaPage } from '../detalle-familia-page/detalle-familia-page';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-lista-familia-page',
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
    RegistrarFamiliaPage,
    DetalleFamiliaPage
],
  templateUrl: './lista-familia-page.html',
  styleUrl: './lista-familia-page.css',
  providers: [ConfirmationService, MessageService],
})
export class ListaFamiliaPage {
  items: MenuItem[] | undefined;

  // LISTA DATOS
  // private productService = inject(ProductService);
  familias: FamiliaModel[] = [];
  detalleFamiliaPage: FamiliaModel = {} as FamiliaModel;
  familiaService = inject(FamiliaService);
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
    this.ObtenerListaFamilias(2);
  }

  MostrarOpcionesCabecera() {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => this.ObtenerListaFamilias(2),
      },
    ];
  }

  ObtenerListaFamilias(estado: number): void {
    this.loading = true;
    const request: RequestListarFamilias = { estado };
    this.familiaService.ListarFamilias(request).subscribe({
      next: (resp: ResponseListarFamilia) => {
        if (resp.exito) {
          this.familias = [...resp.familia];
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

   ConfirmacionAnular(event: Event, familia: FamiliaModel) {
      this.confirmationService.confirm({
        target: event.currentTarget as EventTarget,
        message: `Está seguro de desactivar a la familia ${familia.descripcion}?`,
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

    ConfirmacionActivar(event: Event, familia: FamiliaModel) {
      this.confirmationService.confirm({
        target: event.currentTarget as EventTarget,
        message: `Está seguro de activar a la familia ${familia.descripcion}?`,
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
    this.ObtenerListaFamilias(2);
  }

  showDialog() {
    this.visible = true;
    this.cdr.detectChanges();
  }

  showDialogDetalle(detalle: FamiliaModel) {
    this.detalleFamiliaPage = detalle;
    this.visibleDetalle = true;
    this.cdr.detectChanges();
  }

  showDialogEditar(detalle: FamiliaModel) {
    this.detalleFamiliaPage = detalle;
    this.visibleEditar = true;
    this.cdr.detectChanges();
  }

  // VALIDACIÓN PERMISOS PARA CADA PROCESO
  puedeCrear = computed(() => ['SUPERADMIN', 'ADMIN'].includes(this.loginService.role()));
  puedeActualizar = computed(() => ['ADMIN'].includes(this.loginService.role()));
  puedeVerAuditoria = computed(() => this.loginService.role() === 'SUPERADMIN');
}

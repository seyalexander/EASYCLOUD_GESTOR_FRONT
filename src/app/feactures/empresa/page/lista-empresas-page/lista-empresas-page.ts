import { ChangeDetectorRef, Component, computed, inject, OnInit } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { Tag, TagModule } from 'primeng/tag';
import { ImageModule } from 'primeng/image';
import { Divider } from 'primeng/divider';
import { SvgGoals } from '../../../../../assets/svg/svgs/svgs';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { EmpresaModel } from '../../model/EmpresaModel.model';
import { EmpresaService } from '../../services/api/empresa-service';
import { LoginService } from '../../../login/service/login/login-service';
import { RequestListaEmpresa } from '../../intercambios/request/RequestListaEmpresa.request';
import { ResponseListaEmpresa } from '../../intercambios/response/ResponseListaEmpresa.response';
import { Skeleton, SkeletonModule } from 'primeng/skeleton';
import { ConfirmPopup, ConfirmPopupModule } from 'primeng/confirmpopup';
import { TableModule } from 'primeng/table';
import { IconField, IconFieldModule } from 'primeng/iconfield';
import { InputIcon, InputIconModule } from 'primeng/inputicon';
import { SplitButton, SplitButtonModule } from 'primeng/splitbutton';
import { Toast, ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { ChipModule } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { RegistrarEmpresasPage } from '../registrar-empresas-page/registrar-empresas-page';
import { DetalleEmpresasPage } from '../detalle-empresas-page/detalle-empresas-page';
import { ResponseEditarEstadoEmpresa } from '../../intercambios/response/ResponseEditarEstadoEmpresa.response';
import { EditarEmpresasPage } from "../editar-empresas-page/editar-empresas-page";

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-lista-empresas-page',
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
    RegistrarEmpresasPage,
    DetalleEmpresasPage,
    EditarEmpresasPage
],
  templateUrl: './lista-empresas-page.html',
  styleUrl: './lista-empresas-page.css',
  providers: [ConfirmationService, MessageService],
})
export class ListaEmpresasPage implements OnInit {
  items: MenuItem[] | undefined;
  empresas: EmpresaModel[] = [];
  detalleEmpresaPage: EmpresaModel = {} as EmpresaModel;

  empresaService = inject(EmpresaService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  cdr = inject(ChangeDetectorRef);
  cols!: Column[];
  loading: boolean = true;

  loginService = inject(LoginService);
  esSuperAdmin = computed(() => this.loginService.role() === 'SUPERADMIN');
  esAdmin = computed(() => ['ADMIN', 'SUPERADMIN'].includes(this.loginService.role()));

  visible: boolean = false;
  // MOSTRAR DETALLE
  visibleDetalle: boolean = false;
  // MOSTRAR EDITAR
  visibleEditar: boolean = false;

  ngOnInit() {
    this.MostrarOpcionesCabecera();
    this.ObtenerListaEmpresas(2);
  }

  MostrarOpcionesCabecera() {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => this.ObtenerListaEmpresas(2),
      },
    ];
  }

  ObtenerListaEmpresas(estado: number): void {
    this.loading = true;
    const request: RequestListaEmpresa = { estado };
    this.empresaService.ListarEmpresa(request).subscribe({
      next: (resp: ResponseListaEmpresa) => {
        if (resp.exito) {
          this.empresas = [...resp.empresas];
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al listar las empresas', err);
        this.loading = false;
      },
    });
  }

  ConfirmacionAnular(event: Event, empresa: EmpresaModel) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: 'Está seguro de desactivar a esta empresa?',
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
        this.AnularEmpresa(empresa.idEmpresa)
      },
      reject: () => {},
    });
  }

  ConfirmacionActivar(event: Event, empresa: EmpresaModel) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: 'Está seguro de activar a esta empresa?',
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
        this.ActivarEmpresa(empresa.idEmpresa)
      },
      reject: () => {},
    });
  }

   AnularEmpresa(idEmpresa: number) {
      this.loading = true;
      this.empresaService.AnularEmpresa(idEmpresa).subscribe({
        next: (resp: ResponseEditarEstadoEmpresa) => {
          console.log(resp);

          if (resp.exito) {
            this.messageService.add({
              severity: 'success',
              summary: 'Anulación correcta',
              detail: resp.message,
            });
            this.ObtenerListaEmpresas(2);
          }

          this.loading = false;
        },
        error: (err) => {
          console.error('Error al anular tipo documento', err);
          this.loading = false;
        },
      });
    }

    ActivarEmpresa(idTipoDocumentos: number) {
      this.loading = true;
      this.empresaService.ActivarEmpresa(idTipoDocumentos).subscribe({
        next: (resp: ResponseEditarEstadoEmpresa) => {
          if (resp.exito) {
            this.messageService.add({
              severity: 'success',
              summary: 'Activación correcta',
              detail: resp.message,
            });
            this.ObtenerListaEmpresas(2);
          }

          this.loading = false;
        },
        error: (err) => {
          console.error('Error al activar tipo documento', err);
          this.loading = false;
        },
      });
    }

  showDialogDetalle(detalle: EmpresaModel) {
    this.detalleEmpresaPage = detalle;
    this.visibleDetalle = true;
    this.cdr.detectChanges();
  }

    showDialogEditar(detalle: EmpresaModel) {
      this.detalleEmpresaPage = detalle;
      this.visibleEditar = true;
      this.cdr.detectChanges();
    }

  refrescarLista() {
    this.ObtenerListaEmpresas(2);
  }

  showDialog() {
    this.visible = true;
    this.cdr.detectChanges();
  }

  // VALIDACIÓN PERMISOS PARA CADA PROCESO
  puedeCrear = computed(() => ['SUPERADMIN', 'ADMIN'].includes(this.loginService.role()));
  puedeActualizar = computed(() => ['ADMIN'].includes(this.loginService.role()));
  puedeVerAuditoria = computed(() => this.loginService.role() === 'SUPERADMIN');
}

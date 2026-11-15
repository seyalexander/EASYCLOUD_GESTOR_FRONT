import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { LoginService } from '../../../login/service/login/login-service';
import { Toast } from "primeng/toast";
import { SpeedDialModule } from 'primeng/speeddial';
import { ButtonModule } from 'primeng/button';
import { MenuItem, MessageService } from 'primeng/api';

export interface AppMenuItem {
  label: string;
  icon?: string;
  routerLink?: string;
  badge?: string;
  shortcut?: string;
  visible?: boolean;
  roles?: string[];
  items?: AppMenuItem[];
}

@Component({
  selector: 'app-inicio-page',
  imports: [
    CommonModule,
    RouterLink,
    AvatarModule,
    BadgeModule,
    MenuModule,
    RippleModule,
    RouterOutlet,
    SpeedDialModule,
    ButtonModule,
  ],
  templateUrl: './inicio-page.html',
  styleUrl: './inicio-page.css',
  providers: [MessageService],
})
export class InicioPage implements OnInit {
  menu: AppMenuItem[] = [];
  authService = inject(LoginService);
  items: MenuItem[] = [];
  rutaPrincipal: string = 'inicio';

  private router = inject(Router);


  ngOnInit(): void {
    this.menu = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: `/${this.rutaPrincipal}/DASHBOARD`,
        visible: true,
        roles: ['ADMIN', 'SUPERADMIN', 'USER'],
      },
      {
        label: 'Seguridad',
        visible: true,
        roles: ['SUPERADMIN', 'ADMIN'],
        items: [
          {
            label: 'Usuarios',
            icon: 'pi pi-users',
            routerLink: `/${this.rutaPrincipal}/seguridad/usuarios`,
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Roles',
            icon: 'pi pi-id-card',
            routerLink: `/${this.rutaPrincipal}/seguridad/roles`,
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Empleados',
            icon: 'pi pi-user',
            routerLink: `/${this.rutaPrincipal}/seguridad/empleados`,
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },
        ],
      },

      {
        label: 'Clientes',
        icon: 'pi pi-users',
        visible: true,
        roles: ['SUPERADMIN', 'ADMIN'],
        items: [
          {
            label: 'Tipo Cliente',
            icon: 'pi pi-tags',
            routerLink: '/clientes/tipo',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Cliente',
            icon: 'pi pi-user',
            routerLink: '/clientes',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Direcciones Clientes',
            icon: 'pi pi-map-marker',
            routerLink: '/clientes/direcciones',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Contacto Clientes',
            icon: 'pi pi-phone',
            routerLink: '/clientes/contactos',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },
        ],
      },

      {
        label: 'Productos',
        icon: 'pi pi-box',
        visible: true,
        roles: ['SUPERADMIN', 'ADMIN'],
        items: [
          {
            label: 'Familia',
            icon: 'pi pi-sitemap',
            routerLink: `/${this.rutaPrincipal}/productos/familia`,
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Sub Familia',
            icon: 'pi pi-share-alt',
            routerLink: `/${this.rutaPrincipal}/productos/subfamilia`,
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Unidad Medida',
            icon: 'pi pi-calculator',
            routerLink: `/${this.rutaPrincipal}/productos/unidad-medida`, 
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Marca',
            icon: 'pi pi-tag',
            routerLink: `/${this.rutaPrincipal}/productos/marca`,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Lista Precios',
            icon: 'pi pi-dollar',
            routerLink: `/${this.rutaPrincipal}/productos/lista-precios`,
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Artículos',
            icon: 'pi pi-shopping-bag',
            routerLink: `/${this.rutaPrincipal}/productos/articulos`, 
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },
        ],
      },
      {
        label: 'Inventario',
        icon: 'pi pi-warehouse',
        visible: true,
        roles: ['SUPERADMIN', 'ADMIN'],
        items: [
          {
            label: 'Sucursales',
            icon: 'pi pi-building',
            routerLink: '/inventario/sucursales',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Almacenes',
            icon: 'pi pi-home',
            routerLink: '/inventario/almacenes',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Stock Artículos',
            icon: 'pi pi-box',
            routerLink: '/inventario/stock',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Guías',
            icon: 'pi pi-truck',
            routerLink: '/inventario/guias',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Inventario',
            icon: 'pi pi-list',
            routerLink: '/inventario/inventario',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Ajuste Inventario',
            icon: 'pi pi-sliders-h',
            routerLink: `/${this.rutaPrincipal}/inventario/ajustes`,
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Kardex',
            icon: 'pi pi-book',
            routerLink: '/inventario/kardex',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },
        ],
      },

      {
        label: 'Ventas',
        icon: 'pi pi-shopping-cart',
        visible: true,
        roles: ['SUPERADMIN', 'ADMIN'],
        items: [
          {
            label: 'Turno caja',
            icon: 'pi pi-clock',
            routerLink: '/ventas/turno-caja',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Tipo pago',
            icon: 'pi pi-credit-card',
            routerLink: '/ventas/tipo-pago',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Venta',
            icon: 'pi pi-shopping-bag',
            routerLink: '/ventas',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Reporte Ventas',
            icon: 'pi pi-chart-line',
            routerLink: '/ventas/reporte',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Cuentas por cobrar',
            icon: 'pi pi-wallet',
            routerLink: '/ventas/cuentas-cobrar',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Ajuste Inventario',
            icon: 'pi pi-sliders-h',
            routerLink: `/${this.rutaPrincipal}/inventario/ajustes`,
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Kardex',
            icon: 'pi pi-book',
            routerLink: '/ventas/kardex',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },
        ],
      },
      {
        label: 'Promociones',
        icon: 'pi pi-percentage',
        visible: true,
        roles: ['SUPERADMIN', 'ADMIN'],
        items: [
          {
            label: 'Tipo promociones',
            icon: 'pi pi-tags',
            routerLink: '/promociones/tipo',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Promociones',
            icon: 'pi pi-ticket',
            routerLink: '/promociones',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },
        ],
      },

      {
        label: 'Compras',
        icon: 'pi pi-shopping-cart',
        visible: true,
        roles: ['SUPERADMIN', 'ADMIN'],
        items: [
          {
            label: 'Proveedores',
            icon: 'pi pi-truck',
            routerLink: '/compras/proveedores',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Compras',
            icon: 'pi pi-shopping-bag',
            routerLink: '/compras',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Cuotas por pagar',
            icon: 'pi pi-calendar',
            routerLink: '/compras/cuotas',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Pago proveedores',
            icon: 'pi pi-wallet',
            routerLink: '/compras/pagos',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },
        ],
      },

      {
        label: 'Reportes',
        icon: 'pi pi-chart-bar',
        visible: true,
        roles: ['SUPERADMIN', 'ADMIN'],
        items: [
          {
            label: 'Ventas Diarias',
            icon: 'pi pi-chart-line',
            routerLink: '/reportes/ventas-diarias',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Stock Histórico',
            icon: 'pi pi-history',
            routerLink: '/reportes/stock-historico',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },
        ],
      },

      {
        label: 'Caja',
        icon: 'pi pi-wallet',
        visible: true,
        roles: ['SUPERADMIN', 'ADMIN'],
        items: [
          {
            label: 'Apertura de caja',
            icon: 'pi pi-lock-open',
            routerLink: '/caja/apertura',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Cierre de caja',
            icon: 'pi pi-lock',
            routerLink: '/caja/cierre',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },

          {
            label: 'Movimientos de caja',
            icon: 'pi pi-sort-alt',
            routerLink: '/caja/movimientos',
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },
        ],
      },

      {
        label: 'Configuraciones',
        visible: true,
        roles: ['SUPERADMIN', 'ADMIN'],
        items: [
          {
            label: 'Tipo Documento',
            icon: 'pi pi-id-card',
            routerLink: `/${this.rutaPrincipal}/configuraciones/tipoDocumento`,
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },
          {
            label: 'Empresa',
            icon: 'pi pi-building',
            routerLink: `/${this.rutaPrincipal}/configuraciones/empresas`,
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },
          {
            label: 'Moneda',
            icon: 'pi pi-dollar',
            routerLink: `/${this.rutaPrincipal}/configuraciones/moneda`,
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },
          {
            label: 'Series',
            icon: 'pi pi-file',
            routerLink: `/${this.rutaPrincipal}/configuraciones/series`,
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },
          {
            label: 'Configuraciones',
            icon: 'pi pi-cog',
            routerLink: `/${this.rutaPrincipal}/configuraciones/configuraciones`,
            visible: true,
            roles: ['SUPERADMIN', 'ADMIN'],
          },
        ],
      },
    ];
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  isVisible(item: AppMenuItem): boolean {
    return item.visible !== false;
  }

  menuFiltrado = computed<AppMenuItem[]>(() => {
    const role = this.authService.role();

    return this.menu
      .filter((item) => !item.roles || item.roles.includes(role))
      .map((item) => {
        if (!item.items) return item;

        const itemsFiltrados = item.items.filter((sub) => !sub.roles || sub.roles.includes(role));

        return {
          ...item,
          items: itemsFiltrados,
        };
      });
  });
}

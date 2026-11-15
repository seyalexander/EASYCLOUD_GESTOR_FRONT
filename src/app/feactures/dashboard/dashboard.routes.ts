import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path:'DASHBOARD',
    loadComponent: () => import('../dashboard/page/dashboard-page/dashboard-page').then(m => m.DashboardPage)
  }
];

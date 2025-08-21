import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { authGuard } from './guards/auth.guard';
import { TransferenciaPageComponent } from './components/transferencia-page/transferencia-page';
import { HistorialPageComponent } from './components/historial-page/historial-page';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    // Las páginas de transferir e historial son "hijas" del dashboard
    children: [
      { path: 'transferir', component: TransferenciaPageComponent },
      { path: 'historial', component: HistorialPageComponent },
      { path: '', redirectTo: 'transferir', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

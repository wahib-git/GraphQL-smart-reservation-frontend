import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  // Route par défaut
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  
  // Routes d'authentification (accessibles uniquement aux non-connectés)
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login/login.component').then(c => c.LoginComponent),
    canActivate: [GuestGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./components/auth/register/register.component').then(c => c.RegisterComponent),
    canActivate: [GuestGuard]
  },
  
  // Routes protégées (nécessitent une authentification)
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(c => c.DashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./components/profile/profile.component').then(c => c.ProfileComponent),
    canActivate: [AuthGuard]
  },
  
  // Routes des espaces
  {
    path: 'spaces',
    loadComponent: () => import('./components/spaces/space-list/space-list.component').then(c => c.SpaceListComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'spaces/:id',
    loadComponent: () => import('./components/spaces/space-detail/space-detail.component').then(c => c.SpaceDetailComponent),
    canActivate: [AuthGuard]
  },
  
  // Routes des réservations
  {
    path: 'my-reservations',
    loadComponent: () => import('./components/reservations/my-reservations/my-reservations.component').then(c => c.MyReservationsComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'reservations/:id',
    loadComponent: () => import('./components/reservations/reservation-detail/reservation-detail.component').then(c => c.ReservationDetailComponent),
    canActivate: [AuthGuard]
  },
  
  // Routes d'administration (admin uniquement)
  {
    path: 'admin',
    loadComponent: () => import('./components/admin/admin-dashboard/admin-dashboard.component').then(c => c.AdminDashboardComponent),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'admin/spaces',
    loadComponent: () => import('./components/admin/admin-spaces/admin-spaces.component').then(c => c.AdminSpacesComponent),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'admin/spaces/new',
    loadComponent: () => import('./components/admin/space-form/space-form.component').then(c => c.SpaceFormComponent),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'admin/spaces/:id/edit',
    loadComponent: () => import('./components/admin/space-form/space-form.component').then(c => c.SpaceFormComponent),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'admin/users',
    loadComponent: () => import('./components/admin/admin-users/admin-users.component').then(c => c.AdminUsersComponent),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'admin/reservations',
    loadComponent: () => import('./components/admin/admin-reservations/admin-reservations.component').then(c => c.AdminReservationsComponent),
    canActivate: [AuthGuard, AdminGuard]
  },
  
  // Route 404
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found.component').then(c => c.NotFoundComponent)
  }
];
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container">
        <a class="navbar-brand" routerLink="/dashboard">
          <i class="fas fa-building me-2"></i>
          CoworkSpace
        </a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto" *ngIf="authService.isLoggedIn">
            <li class="nav-item">
              <a class="nav-link" routerLink="/dashboard" routerLinkActive="active">
                <i class="fas fa-tachometer-alt me-1"></i>
                Dashboard
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/spaces" routerLinkActive="active">
                <i class="fas fa-door-open me-1"></i>
                Espaces
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/my-reservations" routerLinkActive="active">
                <i class="fas fa-calendar-check me-1"></i>
                Mes Réservations
              </a>
            </li>
            <li class="nav-item" *ngIf="authService.isAdmin">
              <a class="nav-link" routerLink="/admin" routerLinkActive="active">
                <i class="fas fa-cog me-1"></i>
                Administration
              </a>
            </li>
          </ul>
          
          <ul class="navbar-nav">
            <li class="nav-item dropdown" *ngIf="authService.isLoggedIn">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i class="fas fa-user me-1"></i>
                {{ authService.currentUser?.name }}
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" routerLink="/profile">
                    <i class="fas fa-user-edit me-2"></i>
                    Mon Profil
                  </a>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <button class="dropdown-item" (click)="logout()">
                    <i class="fas fa-sign-out-alt me-2"></i>
                    Déconnexion
                  </button>
                </li>
              </ul>
            </li>
            
            <ng-container *ngIf="!authService.isLoggedIn">
              <li class="nav-item">
                <a class="nav-link" routerLink="/login">Connexion</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/register">Inscription</a>
              </li>
            </ng-container>
          </ul>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
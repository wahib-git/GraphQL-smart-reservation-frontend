import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoginInput } from '../../../types/graphql.types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title text-center mb-4">
                <i class="fas fa-sign-in-alt me-2"></i>
                Connexion
              </h2>
              
              <div *ngIf="error" class="error-message mb-3">
                {{ error }}
              </div>
              
              <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email"
                    name="email"
                    [(ngModel)]="credentials.email"
                    required
                    email
                    #email="ngModel"
                  >
                  <div *ngIf="email.invalid && email.touched" class="text-danger small">
                    Email invalide
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="password" class="form-label">Mot de passe</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="password"
                    name="password"
                    [(ngModel)]="credentials.password"
                    required
                    minlength="4"
                    #password="ngModel"
                  >
                  <div *ngIf="password.invalid && password.touched" class="text-danger small">
                    Le mot de passe doit contenir au moins 6 caractères
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  class="btn btn-primary w-100"
                  [disabled]="loginForm.invalid || loading"
                >
                  <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
                  Se connecter
                </button>
              </form>
              
              <div class="text-center mt-3">
                <p class="mb-0">
                  Pas encore de compte ? 
                  <a routerLink="/register" class="text-decoration-none">S'inscrire</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  credentials: LoginInput = {
    email: '',
    password: ''
  };
  
  loading = false;
  error = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if (this.loading) return;
    
    this.loading = true;
    this.error = '';
    
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.error = error.message || 'Erreur de connexion. Vérifiez vos identifiants.';
      }
    });
  }
}
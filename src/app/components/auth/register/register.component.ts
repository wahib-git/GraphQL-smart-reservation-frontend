import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RegisterInput } from '../../../types/graphql.types';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title text-center mb-4">
                <i class="fas fa-user-plus me-2"></i>
                Inscription
              </h2>
              
              <div *ngIf="error" class="error-message mb-3">
                {{ error }}
              </div>
              
              <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
                <div class="mb-3">
                  <label for="name" class="form-label">Nom complet</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="name"
                    name="name"
                    [(ngModel)]="userData.name"
                    required
                    minlength="2"
                    #name="ngModel"
                  >
                  <div *ngIf="name.invalid && name.touched" class="text-danger small">
                    Le nom doit contenir au moins 2 caractères
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email"
                    name="email"
                    [(ngModel)]="userData.email"
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
                    [(ngModel)]="userData.password"
                    required
                    minlength="6"
                    #password="ngModel"
                  >
                  <div *ngIf="password.invalid && password.touched" class="text-danger small">
                    Le mot de passe doit contenir au moins 6 caractères
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Confirmer le mot de passe</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="confirmPassword"
                    name="confirmPassword"
                    [(ngModel)]="confirmPassword"
                    required
                    #confirmPasswordField="ngModel"
                  >
                  <div *ngIf="confirmPasswordField.touched && userData.password !== confirmPassword" class="text-danger small">
                    Les mots de passe ne correspondent pas
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  class="btn btn-primary w-100"
                  [disabled]="registerForm.invalid || userData.password !== confirmPassword || loading"
                >
                  <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
                  S'inscrire
                </button>
              </form>
              
              <div class="text-center mt-3">
                <p class="mb-0">
                  Déjà un compte ? 
                  <a routerLink="/login" class="text-decoration-none">Se connecter</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  userData: RegisterInput = {
    name: '',
    email: '',
    password: ''
  };
  
  confirmPassword = '';
  loading = false;
  error = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if (this.loading || this.userData.password !== this.confirmPassword) return;
    
    this.loading = true;
    this.error = '';
    
    this.authService.register(this.userData).subscribe({
      next: () => {
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.error = error.message || 'Erreur lors de l\'inscription. Veuillez réessayer.';
      }
    });
  }
}
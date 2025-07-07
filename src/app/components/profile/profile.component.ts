import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types/graphql.types';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <div class="row">
        <div class="col-12">
          <h1 class="mb-4">
            <i class="fas fa-user-edit me-2"></i>
            Mon Profil
          </h1>
          
          <div class="row" *ngIf="user">
            <div class="col-md-8">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Informations personnelles</h5>
                  
                  <div class="mb-3">
                    <label class="form-label">Nom complet</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      [value]="user.name"
                      readonly
                    >
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input 
                      type="email" 
                      class="form-control" 
                      [value]="user.email"
                      readonly
                    >
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label">Rôle</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      [value]="getRoleLabel(user.role)"
                      readonly
                    >
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label">Membre depuis</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      [value]="formatDate(user.createdAt)"
                      readonly
                    >
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-md-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Actions</h5>
                  <div class="d-grid gap-2">
                    <button class="btn btn-outline-warning" disabled>
                      <i class="fas fa-edit me-2"></i>
                      Modifier le profil
                    </button>
                    <button class="btn btn-outline-secondary" disabled>
                      <i class="fas fa-key me-2"></i>
                      Changer le mot de passe
                    </button>
                    <small class="text-muted mt-2">
                      Ces fonctionnalités seront bientôt disponibles.
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.currentUser;
  }

  getRoleLabel(role: string): string {
    const roles: { [key: string]: string } = {
      'admin': 'Administrateur',
      'membre': 'Membre'
    };
    return roles[role] || role;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR');
  }
}
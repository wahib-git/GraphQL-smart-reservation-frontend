import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-5">
      <div class="row">
        <div class="col-12 text-center">
          <div class="py-5">
            <i class="fas fa-exclamation-triangle fa-5x text-warning mb-4"></i>
            <h1 class="display-4">404</h1>
            <h2 class="mb-3">Page non trouvée</h2>
            <p class="lead text-muted mb-4">
              La page que vous cherchez n'existe pas ou a été déplacée.
            </p>
            <a routerLink="/dashboard" class="btn btn-primary">
              <i class="fas fa-home me-2"></i>
              Retour à l'accueil
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class NotFoundComponent {}
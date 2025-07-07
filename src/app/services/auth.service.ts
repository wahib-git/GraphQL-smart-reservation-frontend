import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, Observable, map, tap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User, AuthPayload, LoginInput, RegisterInput } from '../types/graphql.types';
import { LOGIN, REGISTER } from '../graphql/mutations';
import { GET_ME } from '../graphql/queries';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private tokenKey = 'coworking_token';

  constructor(
    private apollo: Apollo,
    private router: Router
  ) {
    this.loadUserFromToken();
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private loadUserFromToken(): void {
    const token = this.token;
    if (token) {
      this.apollo.query<{ me: User }>({
        query: GET_ME,
        errorPolicy: 'all'
      }).subscribe({
        next: ({ data }) => {
          if (data?.me) {
            this.currentUserSubject.next(data.me);
          } else {
            this.logout();
          }
        },
        error: () => {
          this.logout();
        }
      });
    }
  }

  login(input: LoginInput): Observable<AuthPayload> {
    return this.apollo.mutate<{ login: AuthPayload }>({
      mutation: LOGIN,
      variables: { input }
    }).pipe(
      map(result => result.data!.login),
      tap(authPayload => {
        localStorage.setItem(this.tokenKey, authPayload.token);
        this.currentUserSubject.next(authPayload.user);
        this.router.navigate(['/dashboard']);
      }),
      catchError(error => {
        console.error('Erreur de connexion:', error);
        return throwError(() => error);
      })
    );
  }

  register(input: RegisterInput): Observable<AuthPayload> {
    return this.apollo.mutate<{ register: AuthPayload }>({
      mutation: REGISTER,
      variables: { input }
    }).pipe(
      map(result => result.data!.register),
      tap(authPayload => {
        localStorage.setItem(this.tokenKey, authPayload.token);
        this.currentUserSubject.next(authPayload.user);
        this.router.navigate(['/dashboard']);
      }),
      catchError(error => {
        console.error('Erreur d\'inscription:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
    this.apollo.client.clearStore();
    this.router.navigate(['/login']);
  }

  getAuthHeaders(): { [key: string]: string } {
    const token = this.token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}
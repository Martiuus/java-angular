import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, of, firstValueFrom } from 'rxjs';
import { Cliente } from '../models/cliente.model';

export interface AuthRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn.asObservable();
  currentUser = new BehaviorSubject<Cliente | null>(null);
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // El método ahora devuelve el observable para que el APP_INITIALIZER pueda usarlo
  verifySession(): Observable<Cliente | null> {
    if (this.isBrowser) {
      return this.http.get<Cliente>(`${this.apiUrl}/profile`, { withCredentials: true }).pipe(
        tap(user => {
          if (user) {
            this._isLoggedIn.next(true);
            this.currentUser.next(user);
          }
        }),
        catchError(() => {
          this._isLoggedIn.next(false);
          this.currentUser.next(null);
          return of(null);
        })
      );
    }
    return of(null);
  }

  login(credentials: AuthRequest): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/login`, credentials, {
      withCredentials: true
    }).pipe(
      tap(user => {
        this._isLoggedIn.next(true);
        this.currentUser.next(user);
      })
    );
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe(() => {
        this._isLoggedIn.next(false);
        this.currentUser.next(null);
    });
  }

  // Método para obtener el valor actual de isLoggedIn
  getIsLoggedInValue(): boolean {
    return this._isLoggedIn.value;
  }
}

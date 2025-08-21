import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AuthService } from './services/auth';
import { firstValueFrom } from 'rxjs';

// Función que se ejecutará al inicio
export function initializeAuth(authService: AuthService): () => Promise<any> {
  return () => firstValueFrom(authService.verifySession());
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    // Añadimos el APP_INITIALIZER
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [AuthService],
      multi: true
    }
  ]
};

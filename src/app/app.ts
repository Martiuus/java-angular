import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importaciones clave para que los enlaces funcionen
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  // Asegúrate de que los módulos estén en el array de 'imports'
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

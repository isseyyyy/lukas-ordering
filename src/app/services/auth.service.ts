import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    let valid = username === 'admin' && password === 'KokoJambo22';

    if (valid) {
      this.isAuthenticated = true;
      this.router.navigate(['/admin']);
      return true;
    } else {
      alert('Username and Password is incorrect!!');
      this.router.navigate(['/']);
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  canActivate(): boolean {
    if (this.isAuthenticatedUser()) {
      return true;
    } else {
      this.router.navigate(['/admin']);
      return false;
    }
  }
}

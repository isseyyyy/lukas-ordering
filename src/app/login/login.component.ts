import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  checkValue() {
    if (this.loginForm.valid) {
      const user = this.loginForm.get('username').value;
      const pass = this.loginForm.get('password').value;

      if (this.authService.login(user, pass)) {
        this.authService.canActivate();
      } else {
      }
    } else {
      console.log('Form is invalid');
    }
  }
}

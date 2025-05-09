import { AuthService } from './../../../core/services/auth.service';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserLogin } from '../../../core/models/user.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}

  userNotValid: boolean = false;

  wrong: string = '';

  emailSymbol = '@';

  userForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^[a-zA-Z][a-zA-Z0-9]{2,}@[a-zA-Z]{2,10}\.[a-zA-Z]{2,5}$/
      ),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z][a-zA-Z0-9@$#%&*_-]{8,}$/),
    ]),
  });

  onSubmit() {
    this.userForm.markAllAsTouched();
    this.wrong = ''
    this.userNotValid = false;
    if (this.userForm.valid) {
      this.authService.login(this.userForm.value as UserLogin).subscribe({
        next: (response) => {
            localStorage.setItem('token', response.message.token);
            this.router.navigate(['/']);
        },
        error: (error) => {
          this.wrong = error.error.message
          console.log(error);
        },
      });
    } else {
      this.userNotValid = true;
    }
  }
}

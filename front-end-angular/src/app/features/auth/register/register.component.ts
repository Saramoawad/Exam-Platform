import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserRegister } from '../../../core/models/user.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  userNotValid: boolean = false;

  wrong:string = ''

  emailSymbol = '@';

  userForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z]+$/),
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z]+$/),
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z]{1,}[a-zA-Z0-9]*$/),
      Validators.minLength(8),
    ]),
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
    birthDate: new FormControl(undefined),
    stageLevel: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.userForm.markAllAsTouched();
    this.userNotValid = false;
    if (this.userForm.valid) {
      this.authService.register(this.userForm.value as UserRegister).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log(error);
          this.wrong = error.error.message
        },
      });
    } else {
      this.userNotValid = true;
    }
  }
}

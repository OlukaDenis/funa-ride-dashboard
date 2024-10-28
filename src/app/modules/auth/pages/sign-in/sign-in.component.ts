import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiError } from 'src/app/core/models/api-error.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    RouterLink,
    AngularSvgIconModule,
    CommonModule,
    ButtonComponent,
    HttpClientModule
  ],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType = false;
  apiErrors: { [key: string]: string } = {};
  generalError: string = '';
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.apiErrors = {};
    this.generalError = '';

    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    this.authService.login(this.f['email'].value, this.f['password'].value).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/app/dashboard']);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.isLoading = false;
        if (error.error && typeof error.error === 'object') {
          const apiError = error.error as ApiError;
          this.generalError = apiError.message;
          apiError.errors.forEach(err => {
            const key = Object.keys(err)[0];
            this.apiErrors[key] = err[key];
          });
        } else {
          this.generalError = 'An unexpected error occurred. Please try again.';
        }
      }
    });
  }

  togglePasswordTextType(): void {
    this.passwordTextType = !this.passwordTextType;
  }
}

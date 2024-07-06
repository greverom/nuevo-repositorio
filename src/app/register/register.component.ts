import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  passwordFieldType: string = 'password';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]]
    });
  }

  ngOnInit(): void {}

  register() {
    if (this.registerForm.valid) {
      const { email, password, firstName, lastName, phone } = this.registerForm.value;
      this.authService.register(email, password, firstName, lastName, phone).subscribe(
        success => {
          Swal.fire({
            icon: 'success',
            title: 'Registro Exitoso',
            text: 'Redirigiendo...',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/database-products']);
          });
        },
        error => {
          Swal.fire(
            'Error',
            'Hubo un problema al registrarse.',
            'error'
          );
        }
      );
    } else {
      Swal.fire(
        'Formulario no válido',
        'Por favor, rellena todos los campos correctamente.',
        'error'
      );
    }
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  hasPasswordValue(): boolean {
    return this.password?.value?.length > 0;
  }

  get firstName() {
    return this.registerForm.get('firstName')!;
  }

  get lastName() {
    return this.registerForm.get('lastName')!;
  }

  get email() {
    return this.registerForm.get('email')!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  get phone() {
    return this.registerForm.get('phone')!;
  }

}
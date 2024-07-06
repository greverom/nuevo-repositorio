import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: 'Has iniciado sesión exitosamente',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/database-products']);
          });
        },
        error: (error) => {
          Swal.fire('Error!', 'Hubo un problema al iniciar sesión.', 'error');
          console.error('Error al iniciar sesión:', error);
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Formulario no válido',
        text: 'Por favor, completa todos los campos correctamente.',
        timer: 2000,
        showConfirmButton: false
      });
    }
  }


  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }
}
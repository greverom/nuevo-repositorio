import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './servicios/auth.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  showHeader: boolean = true;

  constructor(private router: Router,
              private authService: AuthService
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showHeader = !['/login', '/register'].includes(event.urlAfterRedirects);
    });
  }
  logout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Cerrar Sesión",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout().subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Cierre de sesión',
            text: 'Has cerrado sesión exitosamente',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/login']);
          });
        }, error => {
          Swal.fire('Error', 'Hubo un problema al cerrar sesión', 'error');
          console.error('Error al cerrar sesión:', error);
        });
      }
    });
  }
}

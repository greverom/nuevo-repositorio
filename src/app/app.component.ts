import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './servicios/auth.service';
import Swal from 'sweetalert2';
import { DataService } from './servicios/firebase.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  showHeader: boolean = true;
  selectedFile: File | null = null;
  isModalOpen: boolean = false;

  constructor(private router: Router,
              private authService: AuthService,
              private dataService: DataService
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showHeader = !['/login', '/register'].includes(event.urlAfterRedirects);
    });
  }

  goToHome() {
    this.router.navigate(['/']);
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
        this.authService.logout().subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Cierre de sesión',
              text: 'Has cerrado sesión exitosamente',
              timer: 2000,
              showConfirmButton: false
            }).then(() => {
              this.router.navigate(['/login']);
            });
          },
          error: (error) => {
            Swal.fire('Error', 'Hubo un problema al cerrar sesión', 'error');
            console.error('Error al cerrar sesión:', error);
          }
        });
      }
    });
  }

    // Abrir el modal de video
    openVideoModal() {
      this.isModalOpen = true;
    }
  
    // Cerrar el modal de video
    closeVideoModal() {
      this.isModalOpen = false;
    }
  
    // Manejar la selección de archivo
    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        this.selectedFile = file;
      }
    }

     // Subir el video al Firebase Storage
  uploadVideo() {
    if (this.selectedFile) {
      this.dataService.addVideo(this.selectedFile).then(url => {
        Swal.fire('Éxito', 'Video subido correctamente', 'success');
        this.closeVideoModal(); // Cerrar el modal después de subir el video
        // Aquí puedes manejar la URL del video, como agregarla a un producto
      }).catch(error => {
        Swal.fire('Error', 'Hubo un problema al subir el video', 'error');
        console.error('Error al subir video:', error);
      });
    } else {
      Swal.fire('Error', 'Por favor, selecciona un archivo de video', 'error');
    }
  }
}

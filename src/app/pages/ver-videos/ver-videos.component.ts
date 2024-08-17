import { Component, OnInit } from '@angular/core';
import { DataService } from '../../servicios/firebase.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-videos',
  templateUrl: './ver-videos.component.html',
  styleUrl: './ver-videos.component.css'
})
export class VerVideosComponent implements OnInit {
  videos: string[] = [];
  loading: boolean = true;

  constructor(private dataService: DataService,
               private router: Router
  ) { }

  ngOnInit(): void {

    this.loadVideos();
  }

loadVideos() {
    this.loading = true;
    this.dataService.listAllVideos().then(urls => {
      console.log('URLs de videos obtenidos:', urls);
      this.videos = urls;
      this.loading = false;
    }).catch(error => {
      console.error('Error al cargar videos:', error);
      this.loading = false;
    });
  }

  deleteVideo(videoUrl: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteVideo(videoUrl).then(() => {
          Swal.fire('Eliminado!', 'El video ha sido eliminado.', 'success');
          this.loadVideos(); // Recargar los videos después de eliminar
        }).catch(error => {
          Swal.fire('Error!', 'Hubo un problema al eliminar el video.', 'error');
          console.error('Error al eliminar el video:', error);
        });
      }
    });
  }

  exitVideos() {
    this.router.navigate(['/']); // Redirige al usuario a la página de inicio o a la ruta que desees
  }
}

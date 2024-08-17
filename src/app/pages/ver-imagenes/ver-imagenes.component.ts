import { Component, OnInit } from '@angular/core';
import { DataService } from '../../servicios/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-imagenes',
  templateUrl: './ver-imagenes.component.html',
  styleUrl: './ver-imagenes.component.css'
})
export class VerImagenesComponent implements OnInit {
  

  images: string[] = [];
  loading: boolean = true;

  constructor(private dataService: DataService) { }
  
  ngOnInit(): void {

    this.loadImages();
  }

  loadImages() {
    this.loading = true;
    this.dataService.listAllImages().then(urls => {

        this.images = urls;
        this.loading = false;
    }).catch(error => {
        console.error('Error al cargar imágenes:', error);
        this.loading = false;
    });
}

  deleteImage(imageUrl: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarla',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteImage(imageUrl).then(() => {
          Swal.fire('Eliminado!', 'La imagen ha sido eliminada.', 'success');
          this.loadImages(); // Recargar las imágenes después de eliminar
        }).catch(error => {
          Swal.fire('Error!', 'Hubo un problema al eliminar la imagen.', 'error');
          console.error('Error al eliminar la imagen:', error);
        });
      }
    });
  }
}

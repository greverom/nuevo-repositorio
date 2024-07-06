import { Component, OnInit } from '@angular/core';
import { DataService } from '../../servicios/firebase.service';
import { Product } from '../../models/producto.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-data-base-productos',
  templateUrl: './data-base-productos.component.html',
  styleUrls: ['./data-base-productos.component.css']
})
export class DataBaseProductosComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = true;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService.getProducts().subscribe(products => {
      this.products = products;
      this.loading = false; // Datos cargados, ocultar spinner
    }, error => {
      console.error('Error al cargar productos:', error);
      this.loading = false; // En caso de error, ocultar spinner también
    });
  }
  

  navigateToEdit(key: string | null | undefined, event?: MouseEvent) {
    if (event) {
      event.stopPropagation(); 
    }
    if (key) {
      this.router.navigate(['/editar-producto', key]);
    } else {
      console.error('Invalid product key:', key);
    }
  }



  deleteProduct(key: string | null | undefined, event: MouseEvent) {

    event.stopPropagation(); 

    if (key) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#28a745', 
        cancelButtonColor: '#6c757d', 
        confirmButtonText: 'Eliminarlo!'

      }).then((result) => {

        if (result.isConfirmed) {
          this.dataService.deleteProduct(key).then(() => {
            Swal.fire(
              'Eliminado!',
              'El producto ha sido eliminado.',
              'success'
            );

          }).catch(error => {

            Swal.fire(
              'Error!',
              'Hubo un problema al eliminar el producto.',
              'error'
            );
            console.error('Error al eliminar el producto:', error);
          });
        }
      });

    } else {
      console.error('Invalid product key:', key);
    }
  }
}
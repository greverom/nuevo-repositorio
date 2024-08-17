import { Component } from '@angular/core';
import { Product } from '../../models/producto.model';
import { DataService } from '../../servicios/firebase.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion-producto',
  templateUrl: './configuracion-producto.component.html',
  styleUrls: ['./configuracion-producto.component.css']
})
export class ConfiguracionProductoComponent {

  product: Product = {
    name: '',
    description: '',
    price: 0,
    quantity: 0
  };
  selectedFile: File | null = null;

  constructor(private dataService: DataService,
              private router: Router
  ) {}

  validateProduct(product: Product): boolean {
    return product.name.trim() !== '' 
        && product.description.trim() !== '' 
        && product.price !== null 
        && product.quantity !== null;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addProduct() {
    if (!this.validateProduct(this.product)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios.',
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    this.dataService.addProduct1(this.product, this.selectedFile).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Producto Agregado',
        text: 'El producto ha sido agregado exitosamente',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        this.product = { name: '', description: '', price: 0, quantity: 0 };
        this.selectedFile = null;
      });
    }).catch(error => {
      Swal.fire(
        'Error!',
        'Hubo un problema al agregar el producto.',
        'error'
      );
      console.error('Error al agregar el producto:', error);
    });
  }

  cancel() {
    this.router.navigate(['/']); 
  }
}
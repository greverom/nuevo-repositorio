import { Component, OnInit } from '@angular/core';
import { DataService } from '../../servicios/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/producto.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  product: Product = {
    key: '',
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    imageUrl: ''
  };
  selectedFile: File | null = null;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    
    const key = this.route.snapshot.paramMap.get('key');
    if (key) {
      this.dataService.getProduct(key).subscribe((product: Product | null) => {
        if (product) {
          this.product = { ...product, key }; 
        } else {
          this.router.navigate(['/database-products']);
        }
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updateProduct() {

    if (this.product.key) {

      this.dataService.updateProduct(this.product.key, {
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        quantity: this.product.quantity

      }).then(() => {

        Swal.fire({
          icon: 'success',
          title: 'Producto Actualizado',
          text: 'El producto ha sido actualizado exitosamente',
          timer: 2000, 
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/database-products']);
        });

      }).catch(error => {

        Swal.fire(
          'Error!',
          'Hubo un problema al actualizar el producto.',
          'error'
        );
        console.error('Error al actualizar el producto:', error);
      });
    }
  }

  updateProduct1() {
    if (this.product.key) {
      this.dataService.updateProduct1(this.product.key, this.product, this.selectedFile).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Producto Actualizado',
          text: 'El producto ha sido actualizado exitosamente',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/database-products']);
        });
      }).catch((error: any) => {
        Swal.fire(
          'Error!',
          'Hubo un problema al actualizar el producto.',
          'error'
        );
        console.error('Error al actualizar el producto:', error);
      });
    }
  }
  
}
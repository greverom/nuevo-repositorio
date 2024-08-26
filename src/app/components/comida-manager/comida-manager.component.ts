import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/producto.model';
import { CategoryProductService } from '../../servicios/category-product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-comida-manager',
  templateUrl: './comida-manager.component.html',
  styleUrl: './comida-manager.component.css'
})
export class ComidaManagerComponent implements OnInit {

  selectedCategory: string = 'rollo';
  product: Product = { name: '', description: '', price: 0, quantity: 0, imageUrl: '', backgroundColor: '' };
  selectedFile: File | null = null;
  products: Product[] = [];
  editingKey: string | null = null;

  constructor(private comidaProductService: CategoryProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(comidaForm: NgForm): void {
    if (comidaForm.invalid) {
      this.showToast('error');
      return; // Salir si el formulario es inválido
    }

    if (this.editingKey) {
      this.updateProduct();
    } else {
      this.addProduct();
    }
  }

  addProduct(): void {
    this.comidaProductService.addProductWithImage(this.selectedCategory, this.product, this.selectedFile)
      .then(() => {
        this.resetForm();
        this.loadProducts();
        this.showToast('success');
      })
      .catch(error => {
        this.showToast('error');
        console.error('Error al añadir el producto:', error);
      });
  }

  updateProduct(): void {
    if (this.editingKey) {
      this.comidaProductService.updateProductWithImage(this.selectedCategory, this.editingKey, this.product, this.selectedFile)
        .then(() => {
          this.resetForm();
          this.loadProducts();
          this.showToast('success');
        })
        .catch(error => {
          this.showToast('error');
          console.error('Error al actualizar el producto:', error);
        });
    }
  }

  deleteProduct(key: string): void {
    this.comidaProductService.deleteProduct(this.selectedCategory, key)
      .then(() => {
        this.loadProducts();
        this.showToast('success');
      })
      .catch(error => {
        this.showToast('error');
        console.error('Error al eliminar el producto:', error);
      });
  }

  editProduct(prod: Product): void {
    this.product = { ...prod };
    this.editingKey = prod.key!;
  }

  loadProducts(): void {
    this.comidaProductService.getProducts(this.selectedCategory)
      .subscribe(products => this.products = products);
  }

  resetForm(): void {
    this.product = { name: '', description: '', price: 0, quantity: 0, imageUrl: '', backgroundColor: '' };
    this.selectedFile = null;
    this.editingKey = null;
  }

  showToast(type: 'success' | 'error'): void {
    const toastId = type === 'success' ? 'toast-success' : 'toast-error';
    const toast = document.getElementById(toastId);

    if (toast) {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000); // El toast se oculta después de 3 segundos
    }
  }
}

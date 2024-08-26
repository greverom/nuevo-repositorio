import { Component, OnInit } from '@angular/core';
import { CategoryProductService } from '../../servicios/category-product.service';
import { Product } from '../../models/producto.model';

@Component({
  selector: 'app-menu-dulce-canela',
  templateUrl: './menu-dulce-canela.component.html',
  styleUrl: './menu-dulce-canela.component.css'
})
export class MenuDulceCanelaComponent implements OnInit {
  categories: { name: string, products: Product[] }[] = [];
  
  isEditModalOpen: boolean = false;
  selectedProduct: Product = { name: '', description: '', price: 0, quantity: 0, imageUrl: '', backgroundColor: '' }; // Inicializado
  selectedCategoryName: string = '';

  isToastVisible: boolean = false;
  isToastSuccess: boolean = true;
  toastMessage: string = '';

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private comidaProductService: CategoryProductService) { }

  ngOnInit(): void {
    this.loadCategories();

  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
  
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  loadCategories(): void {
    const categoryNames = ['rollo', 'postres', 'cake'];
    categoryNames.forEach(categoryName => {
      this.comidaProductService.getProducts(categoryName).subscribe(products => {
        // Encuentra la categoría existente o agrégala si no existe
        const categoryIndex = this.categories.findIndex(cat => cat.name === categoryName);
        if (categoryIndex > -1) {
          this.categories[categoryIndex].products = products;
        } else {
          this.categories.push({ name: categoryName, products: products });
        }
      });
    });
  }

  openEditModal(categoryName: string, product: Product): void {
    this.selectedCategoryName = categoryName;
    this.selectedProduct = { ...product }; // Carga los datos del producto
    this.imagePreview = null; 
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedProduct = { name: '', description: '', price: 0, quantity: 0, imageUrl: '', backgroundColor: '' };
    this.selectedFile = null;
    this.imagePreview = null;
  }

  showToast(message: string, success: boolean): void {
    this.toastMessage = message;
    this.isToastSuccess = success;
    this.isToastVisible = true;
    setTimeout(() => {
      this.isToastVisible = false;
    }, 3000); // El toast desaparece después de 3 segundos
  }

  updateProduct(): void {
    if (this.selectedProduct && this.selectedCategoryName) {
      if (this.selectedFile) {
        this.comidaProductService.updateProductWithImage(this.selectedCategoryName, this.selectedProduct.key!, this.selectedProduct, this.selectedFile)
          .then(() => {
            this.showToast('Producto actualizado exitosamente', true);
            this.closeEditModal();
            this.loadCategories(); // Recarga las categorías para reflejar los cambios
          })
          .catch(error => {
            this.showToast('Error al actualizar el producto', false);
            console.error('Error al actualizar el producto:', error);
          });
      } else {
        this.comidaProductService.updateProduct(this.selectedCategoryName, this.selectedProduct.key!, this.selectedProduct)
          .then(() => {
            this.showToast('Producto actualizado exitosamente', true);
            this.closeEditModal();
            this.loadCategories(); // Recarga las categorías para reflejar los cambios
          })
          .catch(error => {
            this.showToast('Error al actualizar el producto', false);
            console.error('Error al actualizar el producto:', error);
          });
      }
    }
  }


  deleteProduct(categoryName: string, key: string): void {
    this.comidaProductService.deleteProduct(categoryName, key)
      .then(() => {
        this.categories = this.categories.map(cat => {
          if (cat.name === categoryName) {
            cat.products = cat.products.filter(prod => prod.key !== key);
          }
          return cat;
        });
      })
      .catch(error => console.error('Error al eliminar el producto:', error));
  }
}

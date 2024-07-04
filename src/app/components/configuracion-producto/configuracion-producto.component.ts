import { Component } from '@angular/core';
import { Product } from '../../models/producto.model';
import { DataService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-configuracion-producto',
  templateUrl: './configuracion-producto.component.html',
  styleUrl: './configuracion-producto.component.css'
})
export class ConfiguracionProductoComponent {

  product: Product = {
    name: '',
    description: '',
    price: null
  };
  constructor(private dataService: DataService) {}

  addProduct() {
    this.dataService.addProduct(this.product).then(() => {

      this.product = { name: '', description: '', price: null };
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './servicios/firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  products: Observable<any[]> = new Observable<any[]>();
  
  productName: string = '';
  productDescription: string = '';
  productPrice: number | null = null;

  constructor(private firebase : FirebaseService) {}

  ngOnInit() {
    this.products = this.firebase.getProducts();
  }
  addProduct() {
    const product = {
      name: this.productName,
      description: this.productDescription,
      price: this.productPrice
    };

    this.firebase.addProduct(product).then(() => {
      this.productName = '';
      this.productDescription = '';
      this.productPrice = null;
    });
  }

  updateProduct(key: string, newName: string) {
    this.firebase.updateProduct(key, { name: newName });
  }

  deleteProduct(key: string) {
    this.firebase.deleteProduct(key);
  }

}

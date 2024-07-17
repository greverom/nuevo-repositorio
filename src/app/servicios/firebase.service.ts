import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private db: AngularFireDatabase) { }

  private getPastelColor(name: string): string {
    const colors = [
      '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#FFC4E1'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
  }

  addProduct(product: Product) {
    product.backgroundColor = this.getPastelColor(product.name);
    return this.db.list('/products').push(product);
  }

  getProducts(): Observable<Product[]> {
    return this.db.list<Product>('/products').snapshotChanges().pipe(
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() as Product }))
      )
    );
  }

  getProduct(key: string): Observable<Product | null> {
    return this.db.object<Product>(`/products/${key}`).valueChanges().pipe(
      map(product => {
        if (product) {
          return { key, ...product };
        }
        return null;
      })
    );
  }

  updateProduct(key: string, updatedProduct: Product) {
    if (!updatedProduct.backgroundColor) {
      updatedProduct.backgroundColor = this.getPastelColor(updatedProduct.name);
    }
    return this.db.object(`/products/${key}`).update(updatedProduct);
  }

  deleteProduct(key: string) {
    return this.db.list('/products').remove(key);
  }
}
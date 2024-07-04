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

  addProduct(product: Product) {
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
    return this.db.list('/products').update(key, updatedProduct);
  }



  deleteProduct(key: string) {
    return this.db.list('/products').remove(key);
  }
}
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Product } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private db: AngularFireDatabase,
              private storage: AngularFireStorage
  ) { }

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

 addProduct1(product: Product, file: File | null): Promise<void> {
    return new Promise((resolve, reject) => {
      if (file) {
        const filePath = `products/${new Date().getTime()}_${file.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);

        task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              product.imageUrl = url;
              product.backgroundColor = this.getPastelColor(product.name);
              this.db.list('/products').push(product).then(() => {
                resolve();
              }).catch(error => {
                reject(error);
              });
            });
          })
        ).subscribe();
      } else {
        product.backgroundColor = this.getPastelColor(product.name);
        this.db.list('/products').push(product).then(() => {
          resolve();
        }).catch(error => {
          reject(error);
        });
      }
    });
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

  updateProduct1(key: string, updatedProduct: Product, file: File | null): Promise<void> {
    return new Promise((resolve, reject) => {
      if (file) {
        const filePath = `products/${new Date().getTime()}_${file.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);

        task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              updatedProduct.imageUrl = url;
              if (!updatedProduct.backgroundColor) {
                updatedProduct.backgroundColor = this.getPastelColor(updatedProduct.name);
              }
              this.db.object(`/products/${key}`).update(updatedProduct).then(() => {
                resolve();
              }).catch(error => {
                reject(error);
              });
            });
          })
        ).subscribe();
      } else {
        if (!updatedProduct.backgroundColor) {
          updatedProduct.backgroundColor = this.getPastelColor(updatedProduct.name);
        }
        this.db.object(`/products/${key}`).update(updatedProduct).then(() => {
          resolve();
        }).catch(error => {
          reject(error);
        });
      }
    });
  }
  

  deleteProduct(key: string) {
    return this.db.list('/products').remove(key);
  }
}
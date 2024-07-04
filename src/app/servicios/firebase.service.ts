import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) { }

  addProduct(product: any) {
    return this.db.list('/products').push(product);
  }
  

  getProducts(): Observable<any[]> {
    return this.db.list('/products').snapshotChanges().pipe(
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() as any }))
      )
    );
  }

 

  updateProduct(key: string, newProduct: any) {
    return this.db.list('/products').update(key, newProduct);
  }



  deleteProduct(key: string) {
    return this.db.list('/products').remove(key);
  }
}
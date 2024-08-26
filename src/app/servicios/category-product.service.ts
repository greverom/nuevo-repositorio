import { Injectable } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { Product } from '../models/producto.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductService {

  constructor(private db: AngularFireDatabase,
              private storage: AngularFireStorage
  ) { }

  /**
   * Agrega un nuevo producto a una subcategoría específica dentro de la categoría "comida".
   * El producto se almacena en la ruta `/comida/{category}` en la base de datos.
   * @param category - La subcategoría donde se almacenará el producto (por ejemplo, 'rollo', 'postres', 'cake').
   * @param product - El producto a agregar, de tipo `Product`.
   * @returns Una promesa que se resuelve cuando el producto se agrega exitosamente.
   */
  addProduct(category: string, product: Product): Promise<void> {
    return this.db.list(`/comida/${category}`).push(product).then(() => {});
  }

  /**
   * Agrega un nuevo producto con imagen a una subcategoría específica dentro de "comida".
   * El archivo de imagen se sube a Firebase Storage y su URL se guarda en la base de datos junto con el producto.
   * @param category - La subcategoría donde se almacenará el producto (por ejemplo, 'rollo', 'postres', 'cake').
   * @param product - El producto a agregar, de tipo `Product`.
   * @param file - El archivo de imagen a subir, puede ser null si no hay imagen.
   * @returns Una promesa que se resuelve cuando el producto y la imagen se agregan exitosamente.
   */
  addProductWithImage(category: string, product: Product, file: File | null): Promise<void> {
    return new Promise((resolve, reject) => {
      if (file) {
        const filePath = `comida/${category}/${new Date().getTime()}_${file.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);

        task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              product.imageUrl = url;
              this.db.list(`/comida/${category}`).push(product).then(() => {
                resolve();
              }).catch(error => {
                reject(error);
              });
            });
          })
        ).subscribe();
      } else {
        this.db.list(`/comida/${category}`).push(product).then(() => {
          resolve();
        }).catch(error => {
          reject(error);
        });
      }
    });
  }

  /**
   * Obtiene todos los productos de una subcategoría específica dentro de "comida".
   * Los productos se obtienen de la ruta `/comida/{category}`.
   * @param category - La subcategoría de donde se obtendrán los productos (por ejemplo, 'rollo', 'postres', 'cake').
   * @returns Un Observable que emite una lista de productos dentro de la subcategoría especificada.
   */
  getProducts(category: string): Observable<Product[]> {
    return this.db.list<Product>(`/comida/${category}`).snapshotChanges().pipe(
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() as Product }))
      )
    );
  }

  /**
   * Obtiene un producto específico de una subcategoría dentro de "comida" utilizando su clave.
   * El producto se obtiene de la ruta `/comida/{category}/{key}`.
   * @param category - La subcategoría donde se encuentra el producto.
   * @param key - La clave del producto a obtener.
   * @returns Un Observable que emite el producto solicitado o null si no existe.
   */
  getProduct(category: string, key: string): Observable<Product | null> {
    return this.db.object<Product>(`/comida/${category}/${key}`).valueChanges().pipe(
      map(product => {
        if (product) {
          return { key, ...product };
        }
        return null;
      })
    );
  }

  /**
   * Actualiza un producto existente en una subcategoría específica dentro de "comida".
   * @param category - La subcategoría donde se encuentra el producto.
   * @param key - La clave del producto a actualizar.
   * @param updatedProduct - El producto actualizado, de tipo `Product`.
   * @returns Una promesa que se resuelve cuando el producto se actualiza exitosamente.
   */
  updateProduct(category: string, key: string, updatedProduct: Product): Promise<void> {
    return this.db.object(`/comida/${category}/${key}`).update(updatedProduct);
  }

  /**
   * Actualiza un producto existente con una nueva imagen en una subcategoría específica dentro de "comida".
   * Si se proporciona un archivo de imagen, se sube a Firebase Storage y se actualiza la URL de la imagen en la base de datos.
   * @param category - La subcategoría donde se encuentra el producto.
   * @param key - La clave del producto a actualizar.
   * @param updatedProduct - El producto actualizado, de tipo `Product`.
   * @param file - El nuevo archivo de imagen, puede ser null si no se actualiza la imagen.
   * @returns Una promesa que se resuelve cuando el producto y la imagen se actualizan exitosamente.
   */
  updateProductWithImage(category: string, key: string, updatedProduct: Product, file: File | null): Promise<void> {
    return new Promise((resolve, reject) => {
      if (file) {
        const filePath = `comida/${category}/${new Date().getTime()}_${file.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);

        task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              updatedProduct.imageUrl = url;
              this.db.object(`/comida/${category}/${key}`).update(updatedProduct).then(() => {
                resolve();
              }).catch(error => {
                reject(error);
              });
            });
          })
        ).subscribe();
      } else {
        this.db.object(`/comida/${category}/${key}`).update(updatedProduct).then(() => {
          resolve();
        }).catch(error => {
          reject(error);
        });
      }
    });
  }

  /**
   * Elimina un producto de una subcategoría específica dentro de "comida".
   * El producto se elimina de la ruta `/comida/{category}/{key}` en la base de datos.
   * @param category - La subcategoría de donde se eliminará el producto.
   * @param key - La clave del producto a eliminar.
   * @returns Una promesa que se resuelve cuando el producto se elimina exitosamente.
   */
  deleteProduct(category: string, key: string): Promise<void> {
    return this.db.list(`/comida/${category}`).remove(key);
  }
}
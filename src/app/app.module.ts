import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { DataBaseProductosComponent } from './components/data-base-productos/data-base-productos.component';
import { ConfiguracionProductoComponent } from './components/configuracion-producto/configuracion-producto.component';
import { HomeComponent } from './components/pages/home/home.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    DataBaseProductosComponent,
    ConfiguracionProductoComponent,
    HomeComponent,
    EditarProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
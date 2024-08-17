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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataBaseProductosComponent } from './components/data-base-productos/data-base-productos.component';
import { ConfiguracionProductoComponent } from './components/configuracion-producto/configuracion-producto.component';

import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerImagenesComponent } from './pages/ver-imagenes/ver-imagenes.component';
import { VerVideosComponent } from './pages/ver-videos/ver-videos.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    DataBaseProductosComponent,
    ConfiguracionProductoComponent,
    EditarProductoComponent,
    LoginComponent,
    RegisterComponent,
    VerImagenesComponent,
    VerVideosComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
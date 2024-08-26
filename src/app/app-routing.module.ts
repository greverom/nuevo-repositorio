import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionProductoComponent } from './components/configuracion-producto/configuracion-producto.component';
import { DataBaseProductosComponent } from './components/data-base-productos/data-base-productos.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerImagenesComponent } from './pages/ver-imagenes/ver-imagenes.component';
import { VerVideosComponent } from './pages/ver-videos/ver-videos.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './auth.guard';
import { ComidaManagerComponent } from './components/comida-manager/comida-manager.component';
import { MenuDulceCanelaComponent } from './components/menu-dulce-canela/menu-dulce-canela.component';

const routes: Routes = [
  { path: '', component: HomeComponent,  canActivate: [AuthGuard] }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'config-product', component: ConfiguracionProductoComponent,  canActivate: [AuthGuard] },
  { path: 'comida-manager', component: ComidaManagerComponent, canActivate: [AuthGuard] }, // Nueva ruta
  { path: 'menu-dulce-canela', component: MenuDulceCanelaComponent, canActivate: [AuthGuard] },
  { path: 'database-products', component: DataBaseProductosComponent,  canActivate: [AuthGuard] },
  { path: 'editar-producto/:key', component: EditarProductoComponent,  canActivate: [AuthGuard] },
  { path: 'ver-imagenes', component: VerImagenesComponent,  canActivate: [AuthGuard] },
  { path: 'ver-videos', component: VerVideosComponent,  canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

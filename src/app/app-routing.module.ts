import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionProductoComponent } from './components/configuracion-producto/configuracion-producto.component';
import { DataBaseProductosComponent } from './components/data-base-productos/data-base-productos.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'config-product', component: ConfiguracionProductoComponent },
  { path: 'database-products', component: DataBaseProductosComponent },
  { path: 'editar-producto/:key', component: EditarProductoComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

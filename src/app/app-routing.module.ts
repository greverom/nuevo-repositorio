import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionProductoComponent } from './components/configuracion-producto/configuracion-producto.component';
import { DataBaseProductosComponent } from './components/data-base-productos/data-base-productos.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';

const routes: Routes = [
  { path: 'config-product', component: ConfiguracionProductoComponent },
  { path: 'database-products', component: DataBaseProductosComponent },
  { path: 'editar-producto/:key', component: EditarProductoComponent },
  { path: '', redirectTo: '/config-product', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/config-product', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

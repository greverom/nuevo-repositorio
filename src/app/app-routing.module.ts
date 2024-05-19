import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { DetalleComponent } from './components/paciente/detalle/detalle.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'pacientes', component: PacientesComponent},
  { path: 'pacientes/:id', component: PacienteComponent},
  { path: 'pacientes/:paciente/:id', component: DetalleComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'pacientes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

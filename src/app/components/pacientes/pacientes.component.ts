import { Component, OnInit } from '@angular/core';

import { PacienteModel } from '../paciente.model';
import { PacienteService } from '../../service/paciente.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})
export class PacientesComponent implements OnInit {
loading:boolean = false;
senal:boolean =true;
pacientes: PacienteModel[] = [];
constructor(private servicio : PacienteService ){}

 ngOnInit(): void {
  this.loading =true;
  this.servicio.cargarPacientes().subscribe( data => {
    console.log(data);
    if(data.length === 0){
      
    }else{
      this.pacientes = data;
      this.senal = false
      this.loading =false;
    }
  })
}

borrar(id:number, paciente:PacienteModel){

   Swal.fire({
    title: 'Estas Seguro?',
    text: `Eliminar a ${paciente.nombres}`,
    icon: 'question',
    showCancelButton: true,
    showConfirmButton: true,

   }).then( data =>{
    if(data.value){

      this.pacientes.splice(id,1);
      this.servicio.deletePaciente(paciente.id).subscribe();
      if(this.pacientes.length === 0){
        this.senal = true;
      }
    };
   });

}

}

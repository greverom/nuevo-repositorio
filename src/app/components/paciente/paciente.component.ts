import { Component, OnInit } from '@angular/core';
import { PacienteModel } from '../paciente.model';
import { NgForm } from '@angular/forms';
import { PacienteService } from '../../service/paciente.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent implements OnInit{
paciente:PacienteModel = new PacienteModel();

constructor(private servicio : PacienteService,
            private parametro : ActivatedRoute){}

ngOnInit(): void {
    let id = this.parametro.snapshot.paramMap.get('id');
    if(id !== "nuevo"){
        this.servicio.getPaciente(id).subscribe((data:PacienteModel) =>{
          this.paciente = data;
          this.paciente.id = id;
      });
    }
}


guardar( form: NgForm ){
  if(form.invalid){
    console.log('formulario no enviado');
    return;
  }

   let peticion : Observable<any>;
   if(this.paciente.id){
    
    peticion = this.servicio.refreshPaciente(this.paciente);
   
  }else{
    
    peticion = this.servicio.crearPaciente(this.paciente);
   
  }
   
    peticion.subscribe( data =>{
    console.log(data)

        Swal.fire({
        title: 'Exito',  
        text: `${this.paciente.nombres} se ha guardado exitosamente!!`,
        icon: 'success',
        timer: 1800,
        showConfirmButton: false
        })
   });
  
}

limpiar(form:NgForm){
  this.paciente.id.delete
  return form.reset();
}




}

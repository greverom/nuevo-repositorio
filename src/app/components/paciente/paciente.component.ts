import { Component, OnInit } from '@angular/core';
import { PacienteModel } from '../paciente.model';
import { NgForm } from '@angular/forms';
import { PacienteService } from '../../service/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent implements OnInit{
paciente:PacienteModel = new PacienteModel();

constructor(private servicio : PacienteService,
            private parametro : ActivatedRoute,
            private ruta : Router){}

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

   if(this.paciente.id){
    
     this.servicio.refreshPaciente(this.paciente)
     .subscribe( () => {
    
      Swal.fire({
      title: 'Actualizado!!',  
      text: `Agregado los cambios de ${this.paciente.nombres}`,
      icon: 'success',
      timer: 1800,
      showConfirmButton: false
      })
      setTimeout(()=>{
        this.ruta.navigate(['pacientes']);
      },1500)
 });
  }else{
    
      this.servicio.crearPaciente(this.paciente)
      .subscribe( () => {
    
        Swal.fire({
        title: 'Guardado!!',  
        text: `${this.paciente.nombres} se ha agregado `,
        icon: 'success',
        timer: 1800,
        showConfirmButton: false
        })
   });
  }
   

}

limpiar(form:NgForm){
  this.paciente.id.delete
  return form.reset();
}


}

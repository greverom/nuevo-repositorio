import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PacienteModel } from '../components/paciente.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  url = 'https://proyecto-crudapp-default-rtdb.firebaseio.com';
  constructor(private http : HttpClient) { }


 crearPaciente(paciente:PacienteModel){
    return this.http.post(`${this.url}/Pacientes.json`, paciente)
     .pipe(
      map((data:any) => {
        paciente.id = data.name
        return paciente;
        })
      );
    }

  

  cargarPacientes(){
    
    return this.http.get(`${this.url}/Pacientes.json`)
    .pipe(
      map( this.crearArreglo)
    )
  };
    
 private crearArreglo (pacienteObj:Object){
      if(pacienteObj === null){
          return [];
      }
          const pacientes: PacienteModel[] = [];
          console.log(pacienteObj);
          Object.keys(pacienteObj).forEach(key => {
            const paciente: PacienteModel = pacienteObj[key];
            paciente.id = key;
            pacientes.push(paciente);
          });
      return pacientes;
  }

 getPaciente(id:string){
    return this.http.get(`${this.url}/Pacientes/${id}.json`)
  }
  

 refreshPaciente(paciente:PacienteModel){
    
    const PacienteT = {
      ...paciente
    };
      delete PacienteT.id;
        return this.http.put(`${this.url}/Pacientes/${paciente.id}.json`, PacienteT);
  }

  deletePaciente(id:string){
    return this.http.delete(`${this.url}/Pacientes/${id}.json`);
  }
}

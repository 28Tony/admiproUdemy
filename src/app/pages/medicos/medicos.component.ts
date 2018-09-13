import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  
  medicos:Medico[]=[];

  constructor(public _servicioMedicos: MedicoService) { } 

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos(){

    this._servicioMedicos.cargarMedicos()
      .subscribe(medicos => this.medicos = medicos);
  }

  buscarMedico(termino:string){

    if (termino.length <= 0){
      this.cargarMedicos();
      return;
    }
    this._servicioMedicos.buscarMedicos(termino)
      .subscribe(medicos => this.medicos = medicos);
  }

  borrarMedico(medico:Medico){
    this._servicioMedicos.borrarMedico(medico._id)
      .subscribe(()=> this.cargarMedicos());
  }  


}

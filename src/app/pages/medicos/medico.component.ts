import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
//import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService, MedicoService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales:Hospital[]=[];
 // medico:Medico= new Medico('','','','','');
  medico:Medico= new Medico();
  hospital:Hospital= new Hospital('');
  constructor(public _servicioMedicos: MedicoService,
              public _servicioHospital: HospitalService,
              public router:Router,
              public activateRoute: ActivatedRoute,
              public _servicioModal: ModalUploadService
            ) { 

              activateRoute.params.subscribe(params => {
                    let id = params['id'];

                    if(id !== 'nuevo'){
                      this.cargarMedico(id);
                    }
              });
            }

  ngOnInit() {
    this._servicioHospital.cargarHospitales()
      .subscribe(hospitales => this.hospitales= hospitales);

      this._servicioModal.notificacion
        .subscribe(res =>{
            this.medico.img= res.medico.img;
        });
  }

  cargarMedico(id:string){
  this._servicioMedicos.cargarMedico(id)
    .subscribe(medico=>{
     // let nuevoMedico = new Medico();
     /*
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
      */
     this.medico = medico.medico;
     this.medico.hospital = medico.hospital;
     this.cambioHospital(this.medico.hospital);
    });
  }


  guardarMedico(forma:NgForm){
  if (forma.invalid){
    return;
  }
  this._servicioMedicos.guardarMedico(this.medico)
    .subscribe((medico:any) => {
     // console.log(res);
     this.medico._id = medico._id;
     this.router.navigate(['/medico', medico._id]);
    })
  }
  cambioHospital(id:string){
      this._servicioHospital.obtenerHospital(id)
        .subscribe(hospital=>{
          console.log(hospital);
          this.hospital= hospital;

        });
  }



  cambiarFoto(){
      this._servicioModal.mostrarModal('medicos', this.medico._id);
  }


}

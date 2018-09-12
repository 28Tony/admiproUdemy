import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/subirArchivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  //oculto:string="";
  
  imagenSubir:File;
  imagenTermporal:string;
  //imagenTermporal:string;

  constructor(public _servicioSubirArchivo: SubirArchivoService,
              public _servicioModal: ModalUploadService ) {
    //console.log('Modal listo');
   }

  ngOnInit() {
  }

  cerrarModal(){
    this.imagenTermporal= null;
    this.imagenSubir = null;
    this._servicioModal.ocultarModal();

  }


  seleccionImagen( archivo: File){

    if(!archivo){
      this.imagenSubir = null;
      return;
    }

    if(archivo.type.indexOf('image') < 0 ){
      swal('Solo imagenes', 'El archivo seleccionado no es un imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTermporal = reader.result;
      //console.log(reader.result);
    


   // console.log(archivo);
  }

  subirImagen(){
//console.log("51464454")
this._servicioSubirArchivo.subirArchivo(this.imagenSubir, this._servicioModal.tipo, this._servicioModal.id)
  .then(respuesta=>{
    console.log(respuesta);
this._servicioModal.notificacion.emit(respuesta);
//this._servicioModal.ocultarModal();
this.cerrarModal();
  })
  .catch(err=>{
  console.log("error en la carga..." +err);
  });
  }
 



}

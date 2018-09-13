import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number=0;

  constructor(public http: HttpClient,
                public _servicioUsuario: UsuarioService) { }

  cargarMedicos(){
    let url = URL_SERVICIOS +'medico';
    return this.http.get(url)
      .map((respuesta:any)=>{
         this.totalMedicos=respuesta.total;
        // console.log(respuesta.medicos);
         return respuesta.medicos;
      });
  }


  cargarMedico(id:string){
    let url = URL_SERVICIOS + 'medico/' + id;
    return this.http.get(url)
    
      .map((respuesta:any)=> respuesta.medico);

  }

  buscarMedicos(termino:string){
    let url = URL_SERVICIOS + 'busqueda/coleccion/medicos/' + termino;
    return this.http.get(url)
    
      .map((respuesta:any)=> respuesta.medicos);
      
    }

    borrarMedico(id: string){

    let url = URL_SERVICIOS +'medico/'+id;
    url+='?token='+this._servicioUsuario.token;
    return this.http.delete(url)
      .map((res)=>{
        swal('Médico Borrado', 'Médico borrado correctamente', 'success');
        return res;
      });

    }

    guardarMedico(medico:Medico){
      let url = URL_SERVICIOS +'medico';
//actualizar

      if (medico._id){
        console.log('Se encontró medico');
        url+='/'+medico._id;
        url+='?token='+this._servicioUsuario.token;
        return this.http.put(url, medico)
          .map((res:any)=>{
            swal('Medico Actualizado', medico.nombre, 'success');
            return res.medico;
          });

      }else{
        console.log('NO Se encontró medico');
        //crear
        url+='?token='+this._servicioUsuario.token;

        return this.http.post(url, medico)
          .map( (medicoActualizado:any)=>{
                
            swal('Medico Creado', medico.nombre, 'success');
            return medicoActualizado.medico;
  
          })
      }


    }
}

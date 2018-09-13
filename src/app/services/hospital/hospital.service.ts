import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import {Hospital} from '../../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales:number = 0; 

  constructor(public http: HttpClient,
              public _serivcioUsuarios:UsuarioService) { }


  cargarHospitales(){

    let url = URL_SERVICIOS+ 'hospital';
    return this.http.get(url)
      .map((resp:any)=>{
        this.totalHospitales= resp.total;
        console.log(resp);
        return resp.hospitales;

      });
  }
  obtenerHospital(id:string){

    let url = URL_SERVICIOS + 'hospital/' +id;
    return this.http.get(url)
      .map((respuesta:any)=> respuesta.hospital);

  }

  borrarHospital(id:string){
    let url = URL_SERVICIOS + 'hospital/' +id;
    url+= '?token='+this._serivcioUsuarios.token;
    return this.http.delete(url)
      .map(respuesta=>{
        swal('Hospital borrado','El hotpital se ha eliminado correctamente', 'success');

      });

  }
  crearHospital(nombre:string){

    let url = URL_SERVICIOS + 'hospital';
    url+= '?token='+this._serivcioUsuarios.token;
    return this.http.post(url,{nombre:nombre})
      .map((respuesta:any)=> respuesta.hospital);
  }

  buscarHospital(termino:string){
    let url = URL_SERVICIOS + 'busqueda/coleccion/hospitales/'+termino;
     return this.http.get(url)
        .map((res:any)=> res.hospitales)
  }

  actualizarHospital(hospital:Hospital){
    let url = URL_SERVICIOS + 'hospital/'+hospital._id;
    url+='?token='+this._serivcioUsuarios.token;
       return   this.http.put(url, hospital)
        .map((res:any)=>res.hospital);

  }
}

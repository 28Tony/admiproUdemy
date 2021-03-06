import { Injectable } from "@angular/core";
import { Usuario } from "../../models/usuario.models";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config/config";
//import {map} from 'rxjs/operators';
import "rxjs-compat";
import { Router } from "@angular/router";
import { SubirArchivoService } from "../subirArchivo/subir-archivo.service";
import { Observable } from "rxjs-compat";
//import 'rxjs/add/operator/map';


//import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: "root"
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu:any[]=[];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  estaLogeado() {
    return this.token.length > 5 ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      this.menu = JSON.parse(localStorage.getItem("menu"));
    } else {
      this.token = "";
      this.usuario = null;
      this.menu= [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu:any) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("menu", JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logOut() {
    this.usuario = null;
    this.token = "";
    this.menu = [];
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("menu");
    this.router.navigate(["/login"]);
  }
  loginGoogle(token: string) {
    let url = URL_SERVICIOS + "login/google";
    return this.http.post(url, { token: token }).map((respuesta: any) => {
      this.guardarStorage(respuesta.id, respuesta.token, respuesta.usuario ,respuesta.menu);
      return true;
    });
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + "usuario";

    return this.http.post(url, usuario).map((respuesta: any) => {
      swal("Usuario creado!!", usuario.email, "success");
      return respuesta.usuario;
    });
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem("email", usuario.email);
    } else {
      localStorage.removeItem("email");
    }

    let url = URL_SERVICIOS + "login";
    return this.http.post(url, usuario).map((respuesta: any) => {
      // localStorage.setItem('email', respuesta.email);
      /*
        localStorage.setItem('id', respuesta.id);
        localStorage.setItem('token', respuesta.token);
        localStorage.setItem('usuario', JSON.stringify(respuesta.usuario));
        */
      this.guardarStorage(respuesta.id, respuesta.token, respuesta.usuario, respuesta.menu);
      return true;
      /*
 console.log(respuesta);
        return true;
        */
    })
    .catch(err =>{
      console.log(err.error.mensaje);
      swal('Error en el login' ,err.error.mensaje, 'warning' );
      return Observable.throw(err);
    });
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + "usuario/" + usuario._id;
    url += "?token=" + this.token;

    //  console.log(url);
    return this.http.put(url, usuario).map((res: any) => {

      if(usuario._id === this.usuario._id){
        let usuarioDB: Usuario = res.usuario;
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
      }
      
      //this.usuario = res.usuario;
   
      swal("Usuario actualizado", usuario.nombre, "success");
    

      return true;
    });
  }

  cambiarImagen(file: File, id: string) {
    this._subirArchivoService
      .subirArchivo(file, "usuarios", id)
      .then((res: any) => {
        //console.log(res);
        this.usuario.img = res.usuario.img;
        swal("Imagen actualizada", this.usuario.nombre, "success");

        this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch(respuesta => {
        console.log(respuesta);
      });
  }


  cargarUsuarios(desde:number=0){
  let url= URL_SERVICIOS +'usuario?desde='+desde;
  return this.http.get(url);

  }

  buscarUsuarios(termino:string){
  let url = URL_SERVICIOS + 'busqueda/coleccion/usuarios/' + termino;
  return this.http.get(url)
  
    .map((respuesta:any)=> respuesta.usuarios);
    
  }

  borrarUsuario(id:string){
    let url = URL_SERVICIOS + 'usuario/'+id;
    url += '?token=' + this.token;

    return this.http.delete(url)
        .map( respuesta =>{
          swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
        });
  }
}

// MI ID
// 576057770994-dlq2c28c4nu18d4u1kllrhvcl35vvalq.apps.googleusercontent.com

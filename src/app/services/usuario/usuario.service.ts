import { Injectable } from "@angular/core";
import { Usuario } from "../../models/usuario.models";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config/config";
//import {map} from 'rxjs/operators';
import "rxjs-compat";
import { Router } from "@angular/router";
import { SubirArchivoService } from "../subirArchivo/subir-archivo.service";
//import 'rxjs/add/operator/map';

@Injectable({
  providedIn: "root"
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

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
    } else {
      this.token = "";
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  logOut() {
    this.usuario = null;
    this.token = "";
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    this.router.navigate(["/login"]);
  }
  loginGoogle(token: string) {
    let url = URL_SERVICIOS + "login/google";
    return this.http.post(url, { token: token }).map((respuesta: any) => {
      this.guardarStorage(respuesta.id, respuesta.token, respuesta.usuario);
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
      this.guardarStorage(respuesta.id, respuesta.token, respuesta.usuario);
      return true;
      /*
 console.log(respuesta);
        return true;
        */
    });
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + "usuario/" + usuario._id;
    url += "?token=" + this.token;

    //  console.log(url);
    return this.http.put(url, usuario).map((res: any) => {
      //this.usuario = res.usuario;
      let usuarioDB: Usuario = res.usuario;
      swal("Usuario actualizado", usuario.nombre, "success");
      this.guardarStorage(usuarioDB._id, this.token, usuarioDB);

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

        this.guardarStorage(id, this.token, this.usuario);
      })
      .catch(respuesta => {
        console.log(respuesta);
      });
  }
}

// MI ID
// 576057770994-dlq2c28c4nu18d4u1kllrhvcl35vvalq.apps.googleusercontent.com

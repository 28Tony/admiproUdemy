import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
//import {map} from 'rxjs/operators';
import 'rxjs-compat';
import { Router } from '@angular/router';
//import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario:Usuario;
  token:string;

  constructor(public http:HttpClient,
              public router:Router) { 
  this.cargarStorage();
  }

  estaLogeado(){

    return (this.token.length > 5) ? true: false;
  }

  cargarStorage(){
    if (localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

guardarStorage(id:string, token: string,usuario: Usuario){
  localStorage.setItem('id',id);
  localStorage.setItem('token', token);
  localStorage.setItem('usuario', JSON.stringify(usuario));
  this.usuario = usuario;
  this.token = token;

}

  logOut(){
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);

  }
  loginGoogle(token:string){
    let url = URL_SERVICIOS+'login/google';
    return this.http.post(url, {token: token})
      .map((respuesta:any) =>{
        this.guardarStorage(respuesta.id,respuesta.token, respuesta.usuario);
        return true;
      });
  }

  crearUsuario(usuario:Usuario){
  let url = URL_SERVICIOS+'usuario';

  return this.http.post(url, usuario)
    .map((respuesta:any) =>{
      swal('Usuario creado!!', usuario.email, 'success');
      return respuesta.usuario;
    });

  }

  login(usuario:Usuario, recordar:boolean= false){

    if (recordar){
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS+'login';
    return this.http.post(url, usuario)
      .map((respuesta:any)=>{
       // localStorage.setItem('email', respuesta.email);
       /*
        localStorage.setItem('id', respuesta.id);
        localStorage.setItem('token', respuesta.token);
        localStorage.setItem('usuario', JSON.stringify(respuesta.usuario));
        */
       this.guardarStorage(respuesta.id,respuesta.token, respuesta.usuario);
       return true;
 /*
 console.log(respuesta);
        return true;
        */
      });

  }
}



// MI ID
// 576057770994-dlq2c28c4nu18d4u1kllrhvcl35vvalq.apps.googleusercontent.com

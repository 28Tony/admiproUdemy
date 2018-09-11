import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.models';
//import { element } from 'protractor';

declare function init_plugins();
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.components.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email:string;
  auth2:any;

  constructor(public router:Router,
              public _serviciousuario: UsuarioService) { }

  ngOnInit() {

    init_plugins();
    this.googleInit();

    this.email= localStorage.getItem('email') || '';
    if (this.email.length > 1){
      this.recuerdame = true;
    }
  }

  googleInit(){
    gapi.load('auth2', ()=>{
        this.auth2 = gapi.auth2.init({
          client_id: '576057770994-dlq2c28c4nu18d4u1kllrhvcl35vvalq.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });

        this.attachSignIn(document.getElementById('btngoogle'));


    })
  }
  attachSignIn(element){
    this.auth2.attachClickHandler(element, {}, (googleUser) =>{
    //  let profile= googleUser.getBasicProfile();
    let token = googleUser.getAuthResponse().id_token;
      //console.log(token);
      this._serviciousuario.loginGoogle(token)
        .subscribe(() =>{
          this.router.navigate(['/dashboard']);
      //  window.location.href = '#/dashboard'
        });
    });
  }


  ingresar(forma:NgForm){

    if (!forma.valid){
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._serviciousuario.login(usuario,forma.value.recuerdame)
      .subscribe(correcto =>{
      this.router.navigate(['/dashboard']);
        //  console.log(respuesta);
      });
      
/*
console.log('ingresando');
console.log(forma.value);
console.log(forma.valid);
*/
 // this.router.navigate(['/dashboard']);
  }

}

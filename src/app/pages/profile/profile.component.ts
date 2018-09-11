import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../models/usuario.models";
import { UsuarioService } from "../../services/service.index";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;

  imagenSubir:File;

  imagenTermporal:any;

  constructor(public _servicioUsuario: UsuarioService) {
    this.usuario = this._servicioUsuario.usuario;
  }

  ngOnInit() {}

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;

    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

    this._servicioUsuario.actualizarUsuario(this.usuario).subscribe();
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

  cambiarImagen(){

this._servicioUsuario.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}

import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario:Usuario;

  constructor(public _servicioUsuario: UsuarioService) { }

  ngOnInit() {
    this.usuario = this._servicioUsuario.usuario;
  }

  logOut(){

    this._servicioUsuario.logOut();
  }

}

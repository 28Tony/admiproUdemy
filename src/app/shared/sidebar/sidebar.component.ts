import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;
  constructor(public _servicioSideBar: SidebarService,
              public _servicioUsuario: UsuarioService) { }

  ngOnInit() {
    this.usuario = this._servicioUsuario.usuario;
  }

  
  logOut(){
  this._servicioUsuario.logOut();
  }
}

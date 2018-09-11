import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(public _servicioSideBar: SidebarService,
              public _servicioUsuario: UsuarioService) { }

  ngOnInit() {
  }

  
  logOut(){
  this._servicioUsuario.logOut();
  }
}

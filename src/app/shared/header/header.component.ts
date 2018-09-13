import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario:Usuario;

  constructor(public _servicioUsuario: UsuarioService,
              public router: Router
              ) { }

  ngOnInit() {
    this.usuario = this._servicioUsuario.usuario;
  }

  logOut(){

    this._servicioUsuario.logOut();
  }
  buscar(termino:string){
      this.router.navigate(['/busqueda', termino]);

  }

}

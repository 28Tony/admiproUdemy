import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../models/usuario.models";
import { UsuarioService } from "src/app/services/service.index";
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  constructor(public _usuarioServicio: UsuarioService,
              public _servicioModal: ModalUploadService) {}

  ngOnInit() {
    this.cargarUsuarios();
    this._servicioModal.notificacion
        .subscribe(res => this.cargarUsuarios());
  }

  mostrarModal(id:string){

    this._servicioModal.mostrarModal('usuarios', id);
  }
  cargarUsuarios() {
    this.cargando = true;
    this._usuarioServicio.cargarUsuarios(this.desde)
      .subscribe((retorno: any) => {
        this.totalRegistros = retorno.total;
        this.usuarios = retorno.usuarios;
        this.cargando = false;
       // console.log(retorno);
      });
  }
  cambiarDesde(numero: number) {
    let desde = this.desde + numero;

    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += numero;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioServicio.buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        //console.log(usuarios);
        this.cargando = false;
      });

    //    console.log(termino);
  }

  borrarUsuario(user: Usuario) {
    //console.log(user);

    if (user._id === this._usuarioServicio.usuario._id) {
      swal(
        "No se puede elimiar usuario",
        "No se puede eliminar a sí mismo",
        "error"
      );
      return;
    }

    swal({
      title: "¿Está seguro?",
      text: "Está a punto de borrar a " + user.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      //  console.log(borrar);

      if (borrar) {
        this._usuarioServicio.borrarUsuario(user._id).subscribe(borrado => {
          console.log(borrado);
          this.cargarUsuarios();
        });
      }
    });
  }

  guardarUsuario(user: Usuario) {
        
    this._usuarioServicio.actualizarUsuario(user)
      .subscribe();


  }


}

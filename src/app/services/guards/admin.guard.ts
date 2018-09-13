import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public _servicioUsuario: UsuarioService,
              public router: Router){
    
  }
  canActivate() {


    if (this._servicioUsuario.usuario.role === 'ADMIN_ROLE'){
    return true;
    }else{
    console.log('Bloqueado por el ADMIN GUARD');
   this.router.navigate(['/login']);
   
   return false;

    }
  }
}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SidebarService, SharedService, UsuarioService, LoginGuardGuard, SubirArchivoService } from './service.index';
import {  HttpClientModule } from '@angular/common/http';
//import { SubirArchivoService } from './subirArchivo/';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { HospitalService, MedicoService } from './service.index';





@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,

    
  ],
  declarations: [],
  providers:[
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService
  ]
})
export class ServiceModule { }

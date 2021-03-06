import { RouterModule,Routes } from "@angular/router";
import { PagesComponent } from './pages.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from "./progress/progress.component";
import { AcountSettingsComponent } from './acount-settings/acount-settings.component';
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from "./medicos/medicos.component";
import { MedicoComponent } from "./medicos/medico.component";
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../services/service.index';


const pagesRoute:Routes =[
    {path:'',
    component:PagesComponent,
    canActivate:[LoginGuardGuard],
    children:[
        {path:'dashboard', component: DashboardComponent,data: { titulo:'Dashboard'}},
        {path:'graficas1', component: Graficas1Component,data: { titulo:'Graficas'}},
        {path:'promesas', component: PromesasComponent,data: { titulo:'Promesas'}},
        {path:'rxjs', component: RxjsComponent,data: { titulo:'Rxjs'}},
        {path:'progress', component: ProgressComponent,data: { titulo:'Progress'}},
        {path:'acount-settings', component: AcountSettingsComponent,data: { titulo:'Ajustes del tema'}},
        {path:'profile', component: ProfileComponent,data: { titulo:'Perfil de usuario'}},
        {path:'busqueda/:termino', component: BusquedaComponent,data: { titulo:'Buscador'}},


        //Mantenimientos
        {
            path:'usuarios',
         component: UsuariosComponent,
         canActivate: [AdminGuard],
         data: { titulo:'Mantenimiento de usuarios'}
        
        },


        {path:'hospitales', component: HospitalesComponent,data: { titulo:'Mantenimiento de hospitales'}},
        {path:'medicos', component: MedicosComponent,data: { titulo:'Mantenimiento de médicos'}},
        {path:'medico/:id', component: MedicoComponent,data: { titulo:'Actualizar médico'}},
        {path:'', pathMatch:'full', redirectTo: '/dashboard'} 
    ]}
]

export const PAGES_ROUTING = RouterModule.forChild(pagesRoute);
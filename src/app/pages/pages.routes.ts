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
        {path:'profile', component: ProfileComponent,data: { titulo:'Perfil de usuairio'}},

        //Mantenimientos
        {path:'usuarios', component: UsuariosComponent,data: { titulo:'Mantenimiento de usuarios'}},
        {path:'', pathMatch:'full', redirectTo: '/dashboard'} 
    ]}
]

export const PAGES_ROUTING = RouterModule.forChild(pagesRoute);
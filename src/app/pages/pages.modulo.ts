import { NgModule } from "@angular/core";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from "./graficas1/graficas1.component";
import { PagesComponent } from "./pages.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
//Modulos importados
import { SharedModule } from "../shared/shared.modulo";
import {FormsModule} from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
//Rutas importadas
import { PAGES_ROUTING } from "./pages.routes";
//Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AcountSettingsComponent } from './acount-settings/acount-settings.component';

//Pipe
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from "./profile/profile.component";
import { CommonModule } from "@angular/common";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { ModalUploadComponent } from "../components/modal-upload/modal-upload.component";
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from "./medicos/medico.component";
import { BusquedaComponent } from './busqueda/busqueda.component';



@NgModule({

    declarations:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AcountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        ModalUploadComponent,
        HospitalesComponent,
        MedicosComponent,
        MedicoComponent,
        BusquedaComponent
    ],
    imports:[
        SharedModule,
        PAGES_ROUTING,
        FormsModule,
        ChartsModule,
        PipesModule,
        CommonModule
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent,
        GraficoDonaComponent 
    ]
})

export class PagesModule{}
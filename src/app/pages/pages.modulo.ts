import { NgModule } from "@angular/core";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from "./graficas1/graficas1.component";
import { PagesComponent } from "./pages.component";
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

@NgModule({

    declarations:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AcountSettingsComponent
    ],
    imports:[
        SharedModule,
        PAGES_ROUTING,
        FormsModule,
        ChartsModule
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
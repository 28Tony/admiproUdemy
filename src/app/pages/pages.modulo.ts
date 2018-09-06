import { NgModule } from "@angular/core";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from "./graficas1/graficas1.component";
import { PagesComponent } from "./pages.component";
//Modulos importados
import { SharedModule } from "../shared/shared.modulo";
//Rutas importadas
import { PAGES_ROUTING } from "./pages.routes";

@NgModule({

    declarations:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent
    ],
    imports:[
        SharedModule,
        PAGES_ROUTING
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent 
    ]
})

export class PagesModule{}
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

//Rutas
import { APP_ROUTING } from './app.routes';

//Modulos
import { PagesModule } from './pages/pages.modulo';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


//Servicios
import { ServiceModule } from './services/service.module';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscriber, Subscription } from "rxjs";
import { retry, map, filter } from "rxjs/operators";

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

 subscri: Subscription;

  constructor() {


     this.subscri = this.regresaObservable()
    .subscribe(
      numero => console.log("Subs", numero),
      error => console.error("Error en el observable", error),
      () => console.log("El observador terminó!!!!!!!!!!")
    );
  } // fin del constructor

  ngOnInit() {}
  ngOnDestroy(){
    console.log('La página se va a cerrar');
    this.subscri.unsubscribe();
  }

  regresaObservable(): Observable<any>{
    return new Observable((observador: Subscriber<any>) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;

        const salida = {
          valor: contador
        }



        observador.next(salida);

        /*
        if (contador == 5) {
          clearInterval(intervalo);
          observador.complete();
        }
        */

     //   if (contador== 3){
     //   //  clearInterval(intervalo);
      //    observador.error('Auxilio');
      //  }

      }, 500); // fin del intervalo
    }).pipe(
      map(respuesta=> respuesta.valor),
      filter( (valor, index) =>{
      //  console.log('Filter', valor, index);
        if (valor % 2 ==1){
          return true
        }else{
          return false;
        }
        
      })
      
    )
    
    
    ; // fin del obs
    
  }
}

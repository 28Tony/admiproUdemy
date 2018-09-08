import { Component, OnInit } from "@angular/core";
import { promise } from "protractor";
import { resolve } from "path";
import { reject } from "q";

@Component({
  selector: "app-promesas",
  templateUrl: "./promesas.component.html",
  styles: []
})
export class PromesasComponent implements OnInit {
  constructor() {
    this.contarTres()
      .then(mensaje => console.log("terminó" + mensaje))
      .catch(error => console.log("Error en la promesa", error));
  }

  ngOnInit() {}

  contarTres(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;
        if (contador === 3) {
          resolve(true);
          clearInterval(intervalo);
        }
      }, 1000); // fin de la funcion de flecha
    }); // fin del promise
   
  }
}

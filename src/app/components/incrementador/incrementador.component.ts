import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit { 
  @ViewChild('txtProgress') txtPorcentaje: ElementRef;

  @Input('nombre') leyenda:string = "Leyenda";
  @Input() porcentaje:number=50;

  @Output('actualizarValor') cambioValor:EventEmitter<number> = new EventEmitter();

  constructor() {
    console.log('leyenda: '+ this.leyenda );
    console.log('progreso: '+this.porcentaje);
   }
   

  ngOnInit() {
  }

  onChange(nuevoValor:number){

  
  //let elemHTML:any = document.getElementsByName('porcentaje')[0];
  //console.log(elemHTML.value);
  if (nuevoValor >= 100){
    this.porcentaje = 100;
  }else if(nuevoValor <= 0){
    this.porcentaje = 0;
  }else{
  this.porcentaje = nuevoValor;
  
  }
 // elemHTML.value= this.porcentaje;
 this.txtPorcentaje.nativeElement.value= this.porcentaje;
  this.cambioValor.emit(this.porcentaje);
  }
  cambiarValor(numero:number){

    if (this.porcentaje >= 100 && numero > 0){
      this.porcentaje = 100;
      return;
    }
    if (this.porcentaje <= 0 && numero < 0){
      this.porcentaje = 0;
      return;
    }
  this.porcentaje = this.porcentaje + numero;
  this.cambioValor.emit(this.porcentaje);
  this.txtPorcentaje.nativeElement.focus();
  }

}

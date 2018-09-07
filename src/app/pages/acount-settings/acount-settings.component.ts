import { Component, OnInit, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import { SettingsService } from "../../services/service.index";


@Component({
  selector: "app-acount-settings",
  templateUrl: "./acount-settings.component.html",
  styleUrls: ["./acount-settings.component.css"]
})
export class AcountSettingsComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private _doc,
              public _servicioSettingService: SettingsService) {}

  ngOnInit() {
    this.colocarCheck();
  }
  cambiarColor(color: string, link: any) {
    this.aplicarCheck(link);
    this._servicioSettingService.aplicarTema(color);
    

  }
  aplicarCheck(link: any) {
    let selectores:any = document.getElementsByClassName('selector');

    for( let ref of selectores){
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck(){
    let selectores:any = document.getElementsByClassName('selector');

    let tema = this._servicioSettingService.ajustes.tema;
    for( let ref of selectores){
      if (ref.getAttribute('data-theme') === tema){
        ref.classList.add('working');
        break;
      }
    }
  }
}

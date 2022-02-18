import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent  {

  habilitar: boolean = true;

  constructor() { }
  //este metodo setHabilitar
  setHabilitar(): void {
    this.habilitar = (this.habilitar == true)? false: true;
  }

  

}

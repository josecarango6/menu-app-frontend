import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent  {

  listaCurso: string[] = ['TypeScrip', 'JavaScript', 'java SE', 'C#', 'php'];

  habilitar: boolean = true;

  constructor() { }
  //este metodo setHabilitar
  setHabilitar(): void {
    this.habilitar = (this.habilitar == true)? false: true;
  }

  

}

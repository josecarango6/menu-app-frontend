import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent  {

  listaCurso: string[] = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5',
                          'Mesa 6', 'Mesa 7', 'Mesa 8', 'Mesa 9', 'Mesa 10'];

  habilitar: boolean = true;

  constructor() { }
  //este metodo setHabilitar
  setHabilitar(): void {
    this.habilitar = (this.habilitar == true)? false: true;
  }

  

}

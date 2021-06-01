import { Component, OnInit } from '@angular/core';
import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html'
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[];

  constructor(
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe(
      categorias => this.categorias = categorias      
    );
  }

}

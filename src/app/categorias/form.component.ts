import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public categoria: Categoria = new Categoria()
  public titulo: string = "Agregar Categoria"

  constructor(
    public categoriaService: CategoriaService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cargarCategoria();
    this.validaciones();
  }

  public validaciones(): void{
    (function () {
      'use strict';
      window.addEventListener('click', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
          form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();
  }

  public cargarCategoria(): void{
    this.activatedRoute.params.subscribe(params => {
      let id_categoria = params['id']
      if(id_categoria){
        this.categoriaService.getCategoria(id_categoria).subscribe( (categoria) => this.categoria = categoria)
      }
    })
  }

  public create(): void{
    this.categoriaService.create(this.categoria)
    .subscribe(categoria => {
      this.router.navigate(['/catproducto'])
      swal.fire('Nueva Categoria', `Categoria ${categoria.nombre} creada con éxito!`, 'success')
        }
    );
  }

  update():void{
    this.categoriaService.update(this.categoria)
    .subscribe( categoria => {
      this.router.navigate(['/catproducto'])
      swal.fire('Categoria Actualizada', `Categoria ${categoria.nombre} actualizada con éxito!`, 'success')
    }
    )
  }

  delete(categoria: Categoria): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Está Seguro?',
      text: `¿Seguro que desea eliminar la categoria ${categoria.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      buttonsStyling: true,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.categoriaService.delete(categoria.id_categoria).subscribe(
          response => {
            this.router.navigate(['/catproducto'])
            swalWithBootstrapButtons.fire(
              'Categoria Eliminada!',
              `Categoria ${categoria.nombre} eliminada con éxito.`,
              'success'
            )
          }
        )
       
      } 
    })
  }



}

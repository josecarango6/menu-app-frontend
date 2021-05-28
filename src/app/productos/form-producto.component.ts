import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductoService } from './producto.service';

import { Router, ActivatedRoute } from '@angular/router'
import swal from 'sweetalert2';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html'
})
export class FormProductoComponent implements OnInit {

  public product: Product = new Product();
  public titulo: string = "Agregar Producto"

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public productoService: ProductoService
  ) { }

  ngOnInit(): void {
 
    this.cargarProduct();
    
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

  public cargarProduct(): void{
    this.activatedRoute.params.subscribe(params => {
      let id_producto = params['id']
      if(id_producto){
        this.productoService.getProduct(id_producto).subscribe( (product) => this.product = product)
      }
    })
  }

  public createProduct(): void{
    this.productoService.createProduct(this.product)
    .subscribe(product => {
      this.router.navigate(['/catproducto'])
      swal.fire('Nuevo Producto', `Producto ${product.nombre} creado con éxito!`, 'success')
        }
    );
  }

  updateProducto():void{
    this.productoService.updateProduct(this.product)
    .subscribe( product => {
      this.router.navigate(['/catproducto'])
      swal.fire('Producto Actualizado', `Producto ${product.nombre} actualizado con éxito!`, 'success')
    }
    )
  }

}

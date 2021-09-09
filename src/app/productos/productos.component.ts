import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { Producto } from './producto';
import { ProductoService} from './producto.service';
import { Product } from './product';
import swal from 'sweetalert2';
import { ReferenceAst } from '@angular/compiler';
import { AuthService } from '../usuarios/auth.service';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {

  productos: Producto[];
  products: Product[];
  

  public producto: Producto = new Producto()
  public product: Product = new Product()

  constructor(
    private productoService: ProductoService,
    private authService: AuthService,
    public router: Router    
    ) { }

  ngOnInit() {
    
    this.productoService.getProductos().subscribe(
      productos => this.productos = productos
    );

    this.productoService.getProducts().subscribe(
      products => this.products = products
    );
    
  }

  public create(): void{
    this.productoService.create(this.producto).subscribe(
      response => this.router.navigate(['/catproducto'])
    )
  }

  public createProduct(): void{
    this.productoService.createProduct(this.product).subscribe(
      response => this.router.navigate(['/catproducto'])
    )
  }

  deleteProduct(product: Product): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Está Seguro?',
      text: `¿Seguro que desea eliminar el producto ${product.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      buttonsStyling: true,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.productoService.deleteProduct(product.id_producto).subscribe(
          response => {
            window.location.reload();
            swalWithBootstrapButtons.fire(
              'Producto Eliminado!',
              `Producto ${product.nombre} eliminada con éxito.`,
              'success'
            )
          }
        )
       
      } 
    })
  }

}

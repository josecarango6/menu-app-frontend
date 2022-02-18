import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { Producto } from '../productos/producto';
import { ProductoService} from '../productos/producto.service';
import { Product } from '../productos/product';
import swal from 'sweetalert2';
import { ReferenceAst } from '@angular/compiler';
import { AuthService } from '../usuarios/auth.service';
import { Categoria } from '../categorias/categoria';


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

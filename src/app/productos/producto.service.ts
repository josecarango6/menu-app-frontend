import { Injectable } from '@angular/core';
import { Producto } from './producto';
import { Categoria } from '../categorias/categoria';
import { Product } from './product';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {URL_BACKEND} from '../config/config';
import { Router, ActivatedRoute } from '@angular/router';
import { map, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../usuarios/auth.service';
import Swal from 'sweetalert2';


@Injectable()

export class ProductoService {
  
private urlEndPoint:string = URL_BACKEND + '/api/catproducto';
//por el urlEndPoint2 se consulta los productos sin la categoria = product
private urlEndPoint2:string = URL_BACKEND + '/api/productos';

private urlEndPoint3:string = 'https://spring-boot-menu-app.herokuapp.com/api/categorias';

private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  
constructor(private http: HttpClient, private router: Router,
            private authService: AuthService) { }

private agregarAuthorizationHeader(){
  let token = this.authService.token;
  if(token != null){
    return this.httpHeaders.append('Authorization', 'Bearer ' + token);
  }
  return this.httpHeaders;
}

  private isNoAutorizado(e) : boolean{
    if (e.status==401){
      this.router.navigate(['/login']);
      return true;
    }

    if (e.status==403){
      Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['/catproducto']);
      return true;
    }
    return false;
  }

  getProductos(): Observable <Producto[]>{
    return this.http.get<Producto[]>(this.urlEndPoint, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getCategorias(): Observable<Categoria[]> {
    //return of(CATEGORIAS);
    return this.http.get<Categoria[]>(this.urlEndPoint, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e)
        return throwError(e);
      })
    );
  }

  getProducts(): Observable <Product[]>{
    return this.http.get<Product[]>(this.urlEndPoint2, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getProduct(id_producto):Observable<Product>{
    return this.http.get<Product>(`${this.urlEndPoint2}/${id_producto}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }



  create(producto: Producto) : Observable<Producto>{
    return this.http.post<Producto>(this.urlEndPoint, producto, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  createProduct(product: Product) : Observable<Product>{
    return this.http.post<Product>(this.urlEndPoint2, product, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  updateProduct(product: Product): Observable<Product>{
    return this.http.put<Product>(`${this.urlEndPoint2}/${product.id_producto}`, product, {headers: this.agregarAuthorizationHeader()} ).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  deleteProduct(id: number): Observable<Product>{
    return this.http.delete<Product>(`${this.urlEndPoint2}/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

}

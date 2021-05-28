import { Injectable } from '@angular/core';
import { Producto } from './producto';
import { Product } from './product';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {URL_BACKEND} from '../config/config';

@Injectable()

export class ProductoService {
  
private urlEndPoint:string = URL_BACKEND + '/api/catproducto';
//por el urlEndPoint2 se consulta los productos sin la categoria = product
private urlEndPoint2:string = URL_BACKEND + '/api/productos';

private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  
constructor(private http: HttpClient) { }

  getProductos(): Observable <Producto[]>{
    return this.http.get<Producto[]>(this.urlEndPoint);
  }

  getProducts(): Observable <Product[]>{
    return this.http.get<Product[]>(this.urlEndPoint2);
  }

  getProduct(id_producto):Observable<Product>{
    return this.http.get<Product>(`${this.urlEndPoint2}/${id_producto}`)
  }



  create(producto: Producto) : Observable<Producto>{
    return this.http.post<Producto>(this.urlEndPoint, producto, {headers: this.httpHeaders})
  }

  createProduct(product: Product) : Observable<Product>{
    return this.http.post<Product>(this.urlEndPoint2, product, {headers: this.httpHeaders})
  }

  updateProduct(product: Product): Observable<Product>{
    return this.http.put<Product>(`${this.urlEndPoint2}/${product.id_producto}`, product, {headers: this.httpHeaders} )
  }

  deleteProduct(id: number): Observable<Product>{
    return this.http.delete<Product>(`${this.urlEndPoint2}/${id}`, {headers: this.httpHeaders})
  }

}

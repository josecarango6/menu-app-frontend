import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {Categoria} from './categoria';
import {HttpClient, HttpHeaders, HttpRequest, HttpEvent} from '@angular/common/http';

import { Router } from '@angular/router';
import {URL_BACKEND} from '../config/config';
import { catchError, retry } from 'rxjs/operators';
import { AuthService } from '../usuarios/auth.service';
import Swal from 'sweetalert2';


@Injectable()

export class CategoriaService {

  private urlEndPoint:string = URL_BACKEND + '/api/categorias';

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

  getCategorias(): Observable<Categoria[]> {
    //return of(CATEGORIAS);
    return this.http.get<Categoria[]>(this.urlEndPoint, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e)
        return throwError(e);
      })
    );
  }

  create(categoria: Categoria) : Observable<Categoria>{
    return this.http.post<Categoria>(this.urlEndPoint, categoria, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e)
        return throwError(e);
      })
    );
  }

  getCategoria(id_categoria):Observable<Categoria>{
    return this.http.get<Categoria>(`${this.urlEndPoint}/${id_categoria}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e)
        return throwError(e);
      })
    );
  }
  
  update(categoria: Categoria): Observable<Categoria>{
    return this.http.put<Categoria>(`${this.urlEndPoint}/${categoria.id_categoria}`, categoria, {headers: this.agregarAuthorizationHeader()} ).pipe(
      catchError(e => {
        this.isNoAutorizado(e)
        return throwError(e);
      })
    );
  }
  
  delete(id: number): Observable<Categoria>{
    return this.http.delete<Categoria>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e)
        return throwError(e);
      })
    );
  }
}



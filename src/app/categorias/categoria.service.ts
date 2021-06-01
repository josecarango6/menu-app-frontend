import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Categoria} from './categoria';
import {HttpClient, HttpHeaders} from '@angular/common/http';


import {URL_BACKEND} from '../config/config';



@Injectable()

export class CategoriaService {

  private urlEndPoint:string = URL_BACKEND + '/api/categorias';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { 

  }
  getCategorias(): Observable<Categoria[]> {
    //return of(CATEGORIAS);
    return this.http.get<Categoria[]>(this.urlEndPoint);
  }

  create(categoria: Categoria) : Observable<Categoria>{
    return this.http.post<Categoria>(this.urlEndPoint, categoria, {headers: this.httpHeaders})
  }

  getCategoria(id_categoria):Observable<Categoria>{
    return this.http.get<Categoria>(`${this.urlEndPoint}/${id_categoria}`)
  }
  
  update(categoria: Categoria): Observable<Categoria>{
    return this.http.put<Categoria>(`${this.urlEndPoint}/${categoria.id_categoria}`, categoria, {headers: this.httpHeaders} )
  }
  
  delete(id: number): Observable<Categoria>{
    return this.http.delete<Categoria>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
  }
}



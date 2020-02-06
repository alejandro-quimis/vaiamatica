import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OperacionesCrud } from './operacionescrud';
const cabecera = {
  headers: new HttpHeaders({'Content-Type': 'application/json',accept: 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export abstract class CrudService<T, ID> implements OperacionesCrud<T, ID> {

  constructor(
    protected _http: HttpClient,
    protected _base: string
  ) {}

  crear(t: T): Observable<any> {
    return this._http.post<any>(this._base + 'nuevo', t, cabecera);
  }
  actualizar( t: T, id: ID): Observable<any> {
    return this._http.put<any>(this._base + 'actualizar/' + id, t, cabecera);
  }

  detalle(id: ID): Observable<T> {
    return this._http.get<T>(this._base + 'detalle/' + id, cabecera);
  }

  lista(): Observable<T[]> {
    return this._http.get<T[]>(this._base + 'listar', cabecera);
  }

  borrar(id: ID): Observable<any> {
    return this._http.delete<any>(this._base + 'borrar/' + id, cabecera);
  }

  obtenercompras(id: ID): Observable<T[]> {
    return this._http.get<T[]>(this._base + 'obtenercompras/' + id, cabecera);
  }

  obtenercomprasproductos(id: ID): Observable<T[]> {
    return this._http.get<T[]>(this._base + 'obtenercomprasproductos/' + id, cabecera);
  }
  
}
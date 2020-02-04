import { Observable } from 'rxjs';

export interface OperacionesCrud<T, ID> {
    crear(t: T): Observable<any>;
	actualizar(t: T,id: ID): Observable<any>;
	detalle(id: ID): Observable<T>;
	lista(): Observable<T[]>;
	borrar(id: ID): Observable<any>;
}
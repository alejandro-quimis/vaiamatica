import { Injectable } from '@angular/core';
import { CrudService } from '../crud.service';
import { Compras } from '../../models/compras';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComprasService extends CrudService<Compras, number> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'http://localhost:8080/api/compras/');
   }
}

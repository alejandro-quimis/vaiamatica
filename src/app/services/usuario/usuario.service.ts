import { Injectable } from '@angular/core';
import { CrudService } from '../crud.service';
import { Usuario } from '../../models/usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CrudService<Usuario, number> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'http://localhost:8080/api/usuario/');
   }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  form:FormGroup
  constructor(private userService:UsuarioService) { }

  ngOnInit() {
    this.form = new FormGroup({
      nombre:new FormControl('',Validators.required),
      usuario:new FormControl('',Validators.required),
      contrasena:new FormControl('',Validators.required),
      cedula:new FormControl('',Validators.required),
      correo:new FormControl('',Validators.required),
      provincia:new FormControl('',Validators.required),
      ciudad:new FormControl('',Validators.required),
    })
  }

  enviar(){
    this.userService.crear(<any>this.form.controls)
  }

}

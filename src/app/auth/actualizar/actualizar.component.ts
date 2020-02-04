import  Swal  from 'sweetalert2';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {
  public forma: FormGroup;
  public user: Usuario;
  
  constructor(public _userservice: UsuarioService , public _login: AuthService) {

    this.forma = new FormGroup({
        codigo: new FormControl({value:'',disabled:true}, Validators.required),
        nombre: new FormControl('', Validators.required),
        cedula: new FormControl('', Validators.required),
        correo: new FormControl('', Validators.required),
        ciudad: new FormControl('default', Validators.required),
        provincia: new FormControl('default', Validators.required),
        usuario: new FormControl('', Validators.required),
        contrasena: new FormControl('', Validators.required)
    })  
  }

  ngOnInit() {
    this._userservice.detalle(this._login.geUserLogin().id).subscribe((data: any) =>{
      console.log(data);
      this.forma = new FormGroup({
        codigo: new FormControl({value:data.codigo,disabled:true}, Validators.required),
        nombre: new FormControl(data.nombre, Validators.required),
        cedula: new FormControl(data.cedula, Validators.required),
        correo: new FormControl(data.correo, Validators.required),
        ciudad: new FormControl(data.ciudad, Validators.required),
        provincia: new FormControl(data.provincia, Validators.required),
        usuario: new FormControl(data.usuario, Validators.required),
        contrasena: new FormControl('', Validators.required)
      });
    });
  }
  Submit() {
    this.user = new Usuario();
    this.user.codigo = this.forma.get('codigo').value;;
    this.user.nombre = this.forma.get('nombre').value;
    this.user.cedula = this.forma.get('cedula').value;
    this.user.correo = this.forma.get('correo').value;
    this.user.ciudad = this.forma.get('ciudad').value;
    this.user.provincia = this.forma.get('provincia').value;
    this.user.usuario = this.forma.get('usuario').value;
    this.user.contrasena = this.forma.get('contrasena').value;

    console.log(this._login.geUserLogin().id)
    this._userservice.actualizar(this.user, this._login.geUserLogin().id).subscribe( data =>{
      Swal.fire({
        icon: 'success',
        title: 'Oops...',
        text: ' No se pudo actualizar Intentelo de nuevo.....',
      });
    }, (err) =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: ' No se pudo actualizar Intentelo de nuevo.....', });
    });
  }

}

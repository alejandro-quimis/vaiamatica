import Swal from 'sweetalert2';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { ProvinciasService } from '../../services/provincias.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {
  public forma: FormGroup;
  public user: Usuario;
  provincias: any[] = [];

  // tslint:disable-next-line: max-line-length
  constructor(public _userservice: UsuarioService , public _login: AuthService, private router: Router, private provinciaservice: ProvinciasService) {
    this.provincias = this.provinciaservice.getprovincias();
    this.forma = new FormGroup({
        codigo: new FormControl({value: '', disabled: true}, Validators.required),
        nombre: new FormControl('', [Validators.required, Validators.pattern("/^[a-zA-Z]*$/")]),
        cedula: new FormControl('', [Validators.required, Validators.pattern("^ [0-9]  $")]),
        correo: new FormControl('', [Validators.required, Validators.pattern("^ [a-z0-9 ._% + -] + @ [a-z0-9 .-] + \. [az] {2,4} $")]),
        ciudad: new FormControl('default', Validators.required),
        provincia: new FormControl('default', Validators.required),
        usuario: new FormControl('', [Validators.required, Validators.pattern("^ [a-z0-9 _-] {5,15} $")]),
        contrasena: new FormControl('', Validators.required),
        estado: new FormControl({value: '', disabled: true}, Validators.required)

    });
  }

  ngOnInit() {
    this._userservice.detalle(this._login.geUserLogin().id).subscribe((data: any) =>{
      console.log(data);
      this.forma.setValue(data);
    });
  }
  Submit() {
    this.user = new Usuario();
    this.user.codigo = this.forma.get('codigo').value;
    this.user.nombre = this.forma.get('nombre').value;
    this.user.cedula = this.forma.get('cedula').value;
    this.user.correo = this.forma.get('correo').value;
    this.user.ciudad = this.forma.get('ciudad').value;
    this.user.provincia = this.forma.get('provincia').value;
    this.user.usuario = this.forma.get('usuario').value;
    this.user.contrasena = this.forma.get('contrasena').value;
    this.user.estado = "a";
    this._userservice.actualizar(this.user, this._login.geUserLogin().id).subscribe( data => {
      console.log(data);
      Swal.fire({
        icon: 'success',
        title: 'Oops...',
        text: ' No se pudo actualizar Intentelo de nuevo.....',
      });
    }, (err) => {
      if (err.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          text: 'Usuario Actualizado correctamente',
        });
      }  else  {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: ' No se pudo actualizar Intentelo de nuevo.....', });
      }
      });
  }

  eliminar() {
    Swal.fire({
      title: 'ESTAS SEGURO?',
      text: 'LOS CAMBIOS NO PODRÁN SER REVERTIDOS!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'CANCELAR',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI, ELIMINAR!'
    }).then((result) => {
      if (result.value) {
        this._userservice.borrar(this.forma.get('codigo').value).subscribe(() => {}
        , (err) => {
          if (err.status === 200) {
            this._login.logout();
            this.router.navigate(['/login']);
          }
        });
        Swal.fire(
          'ELIMINADO!',
          'SU USUARIO HA SIDO ELIMINADO.',
          'success'
        );
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ProvinciasService } from '../../services/provincias.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  form: FormGroup;
  user: Usuario;
  provincias: any[] = [];
  constructor(private userService: UsuarioService, private router: Router, private provinciaservice: ProvinciasService) {
    this.provincias = this.provinciaservice.getprovincias();
    console.log(this.provincias);

  }

  ngOnInit() {
    this.form = new FormGroup({
      nombre: new FormControl('', Validators.required),
      usuario: new FormControl('', Validators.required),
      contrasena: new FormControl('', Validators.required),
      cedula: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      provincia: new FormControl('', Validators.required),
      ciudad: new FormControl('', Validators.required),
    });
  }

  enviar() {
    this.user = new Usuario();
    this.user.nombre = this.form.get('nombre').value;
    this.user.cedula = this.form.get('cedula').value;
    this.user.correo = this.form.get('correo').value;
    this.user.ciudad = this.form.get('ciudad').value;
    this.user.provincia = this.form.get('provincia').value;
    this.user.usuario = this.form.get('usuario').value;
    this.user.contrasena = this.form.get('contrasena').value;
    this.user.estado = "a";
    this.userService.crear( this.user).subscribe( data => {
      Swal.fire({
        icon: 'success',
        title: 'Creado',
        text: 'Usuario Creado correctamente',
      });
    }, (err) => {
      if (err.status === 201) {
        Swal.fire({
          icon: 'success',
        title: 'Creado',
        text: 'Usuario Creado correctamente Su usuario es: ' + this.user.nombre,
        });
        this.router.navigate(['/login']);
      }  else  {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: ' No se pudo actualizar Intentelo de nuevo.....', });
      }
      });

  }

}

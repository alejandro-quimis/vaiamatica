import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router, CanActivate } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public formulario: FormGroup;
    public user: any;

    // tslint:disable-next-line: variable-name
    constructor(private router: Router, public _userService: UsuarioService, public _auth: AuthService) {
        this.formulario = new FormGroup({
            usuario: new FormControl( '' , Validators.required),
            contrasena: new FormControl( '' , Validators.required)
        });
        this._userService.lista().subscribe((e: any) => {
                this.user = e;
            }, (error: any) => {
            }
        );
    }

    submit() {
        // tslint:disable-next-line: prefer-for-of
        let resp;
        for (let i = 0; i < this.user.length; i++) {
            resp = this._auth.login(
                this.user[i].usuario,
                this.formulario.get('usuario').value,
                this.user[i].contrasena,
                this.formulario.get('contrasena').value,
                this.user[i].codigo
            );
            if (resp) {
                this.router.navigate(['']);
                break;
            } else if (!resp && i === this.user.length - 1 ) {
              Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Usuario O Contraseña incorrecta'
              });
            }
        }
    }

    obtenersesion(): boolean {
        if (this._auth.user === null) {
            return false;
        } else if (this._auth.user !== null) {
            return true;
        }
    }

    ngOnInit() {
        if (this._auth.geUserLogin() !== null) {
            this.router.navigate(['/']);
        }
    }
}

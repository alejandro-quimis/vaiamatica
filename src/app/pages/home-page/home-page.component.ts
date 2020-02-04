import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  logueado: boolean;
  constructor(private authService: AuthService, private router: Router) {
    this.logueado = false;
  }

  ngOnInit() {
    //aqui me esto verificando si existe el usuario y la variable booleana la uso para ocultar el elemento
    if (this.authService.user != null) {
      this.logueado = true;
    } else if (this.authService.user === null) {
      this.logueado = false;
    }
  }
  logout() {
    this.logueado = false;
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}

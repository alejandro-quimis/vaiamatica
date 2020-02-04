import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegistroComponent } from "./auth/registro/registro.component";

import { ActualizarComponent } from "./auth/actualizar/actualizar.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { DashboardModule } from "./pages/dashboard/dashboard.module";
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegistroComponent,
        HomePageComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        DashboardModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}

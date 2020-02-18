import { GuardsGuard } from './auth/guards.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { HomePageComponent } from './pages/home-page/home-page.component';


const routes: Routes = [
  // tslint:disable-next-line: max-line-length
  {path: '' , canActivate: [GuardsGuard],
  component: HomePageComponent,
  loadChildren: () => import('./pages/dashboard/dashboard.module')
  .then(e => e.DashboardModule)},
  
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  ];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

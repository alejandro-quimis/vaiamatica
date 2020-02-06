import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListBuyPageComponent } from './list-buy-page/list-buy-page.component';
import { RegisterBuyPageComponent } from './register-buy-page/register-buy-page.component';
import { ActualizarComponent } from 'src/app/auth/actualizar/actualizar.component';
import { ShopPageComponent } from './shop-page/shop-page.component';


const routes: Routes = [
  {path: '', component: ShopPageComponent},
  {path: 'list-buy' , component: ListBuyPageComponent },
  {path: 'register-buy/:id' , component: RegisterBuyPageComponent},
  {path: 'update-user' , component: ActualizarComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ListBuyPageComponent } from './list-buy-page/list-buy-page.component';
import { RegisterBuyPageComponent } from './register-buy-page/register-buy-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { UpdateUserPageComponent } from './update-user-page/update-user-page.component';
import { ActualizarComponent } from 'src/app/auth/actualizar/actualizar.component';
import { ShopPageComponent } from './shop-page/shop-page.component';

const components = [
  ListBuyPageComponent, RegisterBuyPageComponent,UpdateUserPageComponent,ActualizarComponent
]

@NgModule({
  declarations: [...components, ShopPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    DashboardRoutingModule
  ],
  exports:[...components]
})
export class DashboardModule { }

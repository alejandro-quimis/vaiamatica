import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ListBuyPageComponent } from './list-buy-page/list-buy-page.component';
import { RegisterBuyPageComponent } from './register-buy-page/register-buy-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ActualizarComponent } from 'src/app/auth/actualizar/actualizar.component';
import { ShopPageComponent } from './shop-page/shop-page.component';
import {MatIconModule} from '@angular/material/icon';
import { UpdatemodalComponent } from './updatemodal/updatemodal.component';
import {MatDialogModule} from '@angular/material/dialog';
const components = [
  ListBuyPageComponent, RegisterBuyPageComponent, ActualizarComponent,UpdatemodalComponent
];

const modules = [
  CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardRoutingModule,
    MatDialogModule,
  ];

@NgModule({
  declarations: [...components, ShopPageComponent, UpdatemodalComponent],
  imports: [
    ...modules,
    ScrollingModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ],
  exports: [...components, ...modules],
  entryComponents:[UpdatemodalComponent]
})
export class DashboardModule { }

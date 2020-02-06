import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto/producto.service';
import Swal from 'sweetalert2';
import { Compras } from 'src/app/models/compras';
import { ComprasService } from 'src/app/services/compras/compras.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import {map, startWith} from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import {ChangeDetectionStrategy} from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';

@Component({
    selector: 'app-shop-page',
    templateUrl: './shop-page.component.html',
    styleUrls: ['./shop-page.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ShopPageComponent implements OnInit {
    public productos = [];
    public lista = [];
    public total = 0;
    public compra: Compras;
    public myControl: FormControl;
    filteredOptions: Observable<Producto[]>;
    items: any;
    constructor(public _login: AuthService, private productService: ProductoService, private compraService: ComprasService) {
      this.myControl = new FormControl('');
    }

    ngOnInit() {
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(name => name ? this._filter(name) : this.lista.slice())
      );
      this.productService.lista().subscribe((e: any) => {
            this.lista = e;
        });
    }

    displayFn(pro?: Producto): string | undefined {
      return pro ? pro.nombre : undefined;
    }

    private _filter(name: string): Producto[] {
      const filterValue = name.toLowerCase();
      return this.lista.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
    }

    addCar(item, valor) {
      if ( Number(valor.value) === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Agrege la cantidad que desee comprar',
        });
      } else {
      this.productos.push(item);
      this.total += item.valor * Number(valor.value);
      this.compra = new Compras();
      this.compra.producto = item.codigo;
      this.compra.cantidad = Number(valor.value);
      this.compra.fecha = new Date(new Date().getDay() + '/' + new Date().getMonth() + '/' + new Date().getFullYear());
      this.compra.total = this.total;
      this.compra.usuario = this._login.geUserLogin().id;

      this.compraService.crear(this.compra).subscribe(() => {},
      (err) => {
        console.log(err);
        if (err.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Compra Correcta',
          text: `Su valor a pagar es $ ${this.total}`,
        });
        this.total = 0;
      }
      });
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { ProductoService } from "src/app/services/producto/producto.service";
import Swal from 'sweetalert2';
import { Compras } from 'src/app/models/compras';
import { ComprasService } from 'src/app/services/compras/compras.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import {map, startWith} from 'rxjs/operators';
@Component({
    selector: "app-shop-page",
    templateUrl: "./shop-page.component.html",
    styleUrls: ["./shop-page.component.css"]
})
export class ShopPageComponent implements OnInit {
    public shoppingCart = [];
    public lista = [];
    public total = 0;
    public compra:Compras
    public myControl: FormControl
    filteredOptions: Observable<Producto[]>;

    constructor(private productService: ProductoService,private compraService:ComprasService) {
      this.myControl = new FormControl('')
    }

    ngOnInit() {
      console.log(this.myControl.valueChanges)
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
    displayFn(user?: Producto): string | undefined {
      return user ? user.nombre : undefined;
    }

    private _filter(name: string): Producto[] {
      const filterValue = name.toLowerCase();
  
      return this.lista.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
    }

    addCar(item,valor) {
      this.shoppingCart.push(item);
      this.total += item.valor * valor.value

      Swal.fire({
        icon: 'success',
        title: 'Compra Correcta',
        text: `Su valor a pagar es $ ${this.total}`,
      });
      this.compra = new Compras();
      this.compra.Producto = item.codigo;;
      this.compra.cantidad = valor.value;
      this.compra.fecha = new Date(new Date().getDay()+'/'+new Date().getMonth()+'/'+new Date().getFullYear());
      this.compra.codigo = 0;
      
      this.compraService.crear(this.compra).subscribe()
    }
}

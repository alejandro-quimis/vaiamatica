import { Component, OnInit } from "@angular/core";
import { ProductoService } from "src/app/services/producto/producto.service";
import Swal from 'sweetalert2';
import { Compras } from 'src/app/models/compras';
import { ComprasService } from 'src/app/services/compras/compras.service';

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
    constructor(private productService: ProductoService,private compraService:ComprasService) {}

    ngOnInit() {
        this.productService.lista().subscribe((e: any) => {
            this.lista = e;
        });
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
      this.compra.Producto = item;
      this.compra.cantidad = valor.value;
      this.compra.fecha = new Date(new Date().getDay()+'/'+new Date().getMonth()+'/'+new Date().getFullYear());
      this.compra.codigo = item.codigo;
      
      this.compraService.crear(this.compra).subscribe()
    }
}

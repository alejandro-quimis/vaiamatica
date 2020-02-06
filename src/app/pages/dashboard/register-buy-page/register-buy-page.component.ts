import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { Producto } from 'src/app/models/producto';
import { startWith, map } from 'rxjs/operators';
import { Compras } from '../../../models/compras';
import { ActivatedRoute} from '@angular/router';
import { ComprasService } from '../../../services/compras/compras.service';
@Component({
  selector: 'app-register-buy-page',
  templateUrl: './register-buy-page.component.html',
  styleUrls: ['./register-buy-page.component.css']
})
export class RegisterBuyPageComponent implements OnInit {
    public productos = [];
    public forma: FormGroup;
    public producto = null;
    public lista = [];
    public total = 0;
    public valor1 = 0;
    public compra: Compras;
    public myControl: FormControl;
    filteredOptions: Observable<Producto[]>;
    items: any;


  constructor(private productService: ProductoService, private activateroute: ActivatedRoute,private compraservice: ComprasService) {
    this.myControl = new FormControl('');
    this.forma = new FormGroup({
      codigocompra: new FormControl('', Validators.required),
      codigoproducto: new FormControl('', Validators.required),
      codigousuario: new FormControl('', Validators.required),
      unitario: new FormControl('', Validators.required),
      fecha: new FormControl({value: '', disabled: true}, Validators.required),
      producto: new FormControl({value: '', disabled: true}, Validators.required),
      cantidad: new FormControl('', Validators.required),
      total: new FormControl({value: '', disabled: true}, Validators.required),
  });

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
    this.activateroute.params.subscribe(data => {
       this.compraservice.obtenercomprasproductos(data['id']).subscribe((d) => {
            this.producto = d;
            this.forma = new FormGroup({
              codigocompra: new FormControl(this.producto.codigo, Validators.required),
              codigoproducto: new FormControl(this.producto.producto, Validators.required),
              codigousuario: new FormControl(this.producto.usuario, Validators.required),
              fecha: new FormControl(this.producto.fecha, Validators.required),
              producto: new FormControl(this.producto.productos.nombre, Validators.required),
              unitario: new FormControl(this.producto.productos.valor, Validators.required),
              cantidad: new FormControl(this.producto.cantidad, Validators.required),
              total: new FormControl(this.producto.total, Validators.required),
          });
       });
    });
  }

  displayFn(pro?: Producto): string | undefined {
    return pro ? pro.nombre : undefined;
  }

  enviar(event) {
    this.forma.get('producto').setValue(event.nombre);
    this.forma.get('cantidad').setValue('');
    this.forma.get('total').setValue('');
    this.forma.get('unitario').setValue(event.valor);
  }
  cambio(){
    
    this.forma.get('total').setValue(Number(this.forma.get('cantidad').value) * Number(this.forma.get('unitario').value));
  }

  private _filter(name: string): Producto[] {
    const filterValue = name.toLowerCase();
    return this.lista.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  Submit() {

  }

}

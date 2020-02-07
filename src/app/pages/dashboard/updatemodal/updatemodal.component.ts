import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductoService } from '../../../services/producto/producto.service';
import { ActivatedRoute } from '@angular/router';
import { ComprasService } from '../../../services/compras/compras.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Compras } from '../../../models/compras';
import { Observable } from 'rxjs';
import { Producto } from '../../../models/producto';
import { startWith, map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatemodal',
  templateUrl: './updatemodal.component.html',
  styles: []
})
export class UpdatemodalComponent {
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

  constructor(
    public dialogRef: MatDialogRef<UpdatemodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductoService,
    private compraservice: ComprasService) {

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

  Click(): void {
    this.dialogRef.close();
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
    this.obtenercompra();

  }
  obtenercompra(){
    this.compraservice.obtenercomprasproductos(this.data.codigo).subscribe((d) => {
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
  cambio() {
    this.forma.get('total').setValue(Number(this.forma.get('cantidad').value) * Number(this.forma.get('unitario').value));
  }

  private _filter(name: string): Producto[] {
    const filterValue = name.toLowerCase();
    return this.lista.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  Submit() {
    this.compra = new Compras();
    this.compra.cantidad = this.forma.get('cantidad').value;
    this.compra.codigo = this.forma.get('codigocompra').value;
    this.compra.fecha = new Date(new Date().getDay() + '/' + new Date().getMonth() + '/' + new Date().getFullYear());
    this.compra.producto =  this.forma.get('codigoproducto').value;
    this.compra.usuario = this.forma.get('codigousuario').value;
    this.compra.total = this.forma.get('total').value;
    console.log(this.compra);
    this.compraservice.actualizar(this.compra, this.compra.codigo).subscribe(() => {
    }, (err) => {
      if (err.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          text: 'Compra Actualizada correctamente',
        });

        this.dialogRef.close();
      }  else  {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: ' No se pudo actualizar Intentelo de nuevo.....', });
      }
      });

  }


}

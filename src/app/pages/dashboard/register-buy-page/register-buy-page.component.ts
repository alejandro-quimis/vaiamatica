import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-register-buy-page',
  templateUrl: './register-buy-page.component.html',
  styleUrls: ['./register-buy-page.component.css']
})
export class RegisterBuyPageComponent implements OnInit {
  public myControl;
  form:FormGroup;
  productos: Producto[];
  filteredOptions: Observable<string[]>;
  constructor(public _producto: ProductoService) {
   this._producto.lista().subscribe( (data: any) =>{
    this.productos = data;
    console.log(this.productos);
   });
  }


  ngOnInit() {
    this.myControl = new FormControl()
    /*this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );*/
  }
  /*private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.productos.filter(option => option.toLowerCase().includes(filterValue));
  }*/

}

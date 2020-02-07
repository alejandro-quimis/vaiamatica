import { Component, OnInit, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { ComprasService } from 'src/app/services/compras/compras.service';
import { ProductoService } from '../../../services/producto/producto.service';
import { Compras } from '../../../models/compras';
import { AuthService } from '../../../services/auth.service';
import { Producto } from '../../../models/producto';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { UpdatemodalComponent } from '../updatemodal/updatemodal.component';

@Component({
  selector: 'app-list-buy-page',
  templateUrl: './list-buy-page.component.html',
  styleUrls: ['./list-buy-page.component.css']
})
export class ListBuyPageComponent implements AfterViewInit {
  private compra: Compras[];
  private productos: Producto[] = [];
  displayedColumns: string[] = ['#', 'cantidad', 'fecha', 'producto', 'total', 'actualizar', 'eliminar'] ;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource <Compras>([]);

  // tslint:disable-next-line: max-line-length
  constructor(public dialog: MatDialog,
    private router: Router, 
    private compraService: ComprasService, 
    private  productoservice: ProductoService, 
    private _auth: AuthService) {
  this.getcompra();

  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  public redirectToDelete = (id: number) => {
        Swal.fire({
          title: 'ESTAS SEGURO?',
          text: 'LOS CAMBIOS NO PODRÁN SER REVERTIDOS!',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'CANCELAR',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'SI, ELIMINAR!'
        }).then((result) => {
          if (result.value) {
            this.compraService.borrar(id).subscribe(() => { }
            , (err) => {
              if (err.status === 200 ) {
                  Swal.fire(
                  'ELIMINADO!',
                  'EL PRODUCTO HA SIDO ELIMINADO.',
                  'success');
                  this.getcompra();
                }
        });
      }
    });
  }

  getcompra() {
    /*this.compraService.obtenercompras(this._auth.geUserLogin().id).subscribe( (e: Compras[]) => {
      this.compra = e;
      this.dataSource.data = (this.compra);
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.compra.length; i++) {
       this.productoservice.detalle(this.compra[i].producto).subscribe(data => {
         this.productos.push(data);
       });
       }
      this.dataSource._updateChangeSubscription();
   });*/

   this.compraService.obtenercomprasproductossuario(this._auth.geUserLogin().id).subscribe((e: any) => {
      console.log(e);
      this.dataSource.data = (e);
   });
   this.dataSource._updateChangeSubscription();

  }

  openDialog(codigo: number): void {
    const dialogRef = this.dialog.open(UpdatemodalComponent, {
      width: '500px',
      data: {codigo}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getcompra();
    });
  }



}













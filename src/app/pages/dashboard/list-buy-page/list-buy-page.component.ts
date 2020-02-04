import { Component, OnInit } from '@angular/core';
import { ComprasService } from 'src/app/services/compras/compras.service';

@Component({
  selector: 'app-list-buy-page',
  templateUrl: './list-buy-page.component.html',
  styleUrls: ['./list-buy-page.component.css']
})
export class ListBuyPageComponent implements OnInit {
  private compra = []
  constructor(private compraService:ComprasService) { 
  this.compraService.lista().subscribe(e=>{
    this.compra = e
  })
  }

  ngOnInit() {
  }

}

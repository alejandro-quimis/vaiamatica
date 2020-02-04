import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  form:FormGroup
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      
    })
  }

}

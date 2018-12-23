import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product-screen',
  templateUrl: './add-product-screen.component.html',
  styleUrls: ['./add-product-screen.component.css']
})
export class AddProductScreenComponent implements OnInit {

  constructor(public route: Router) { }

  ngOnInit() {
  }
  addProduct(){
    this.route.navigate(['/addProduct'])

  }
}

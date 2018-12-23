import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  isActive: Event;

  constructor( public route: Router) { }

  ngOnInit() {
   
  }
  addProduct(){
    console.log("hgfdfghujhgfds")
    this.route.navigate(['/addProductScreen']);  }
}

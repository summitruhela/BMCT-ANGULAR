import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  state: any = "";
  constructor() { 
    this.state = (window.location.pathname).split('/')[1];
  }

  ngOnInit() {
  }

}

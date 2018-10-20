import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any
@Component({
  selector: 'app-static-content-management',
  templateUrl: './static-content-management.component.html',
  styleUrls: ['./static-content-management.component.css']
})
export class StaticContentManagementComponent implements OnInit {

  constructor(private router:Router) { 
    $('[data-toggle="View"]').tooltip();   
    $('[data-toggle="Edit"]').tooltip();   
     
  }

  ngOnInit() {
     
  }
  view(e){
    if(e === "a"){
      localStorage.sc = 'About Us'

    } else if(e === "t"){
      localStorage.sc = 'Terms & Conditions'
 
    } else if(e == "p"){
      localStorage.sc = 'Privacy Policy'    
    }    
   
    this.router.navigate(['/static-view'])
  }
  edit(e){
    if(e === "a"){
      localStorage.sc = 'About Us'

    } else if(e === "t"){
      localStorage.sc = 'Terms & Conditions'
 
    } else if(e == "p"){
      localStorage.sc = 'Privacy Policy'    
    }    
    console.log('edit clicked!')  
    this.router.navigate(['/static-edit'])
  }
  
}

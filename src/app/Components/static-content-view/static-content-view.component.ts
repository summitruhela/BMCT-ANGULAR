import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../Services/provider.service';
import {  DomSanitizer} from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-static-content-view',
  templateUrl: './static-content-view.component.html',
  styleUrls: ['./static-content-view.component.css']
})
export class StaticContentViewComponent implements OnInit {
body:any;
title:any;
  constructor(private service: ProviderService, private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit() {
    this.service.spinnerShow()
    this.getStaticView()
  }
  getStaticView(){
this.title= localStorage.sc
    if(localStorage.sc == 'About Us'){
     
      this.service.callGet('getAboutUs').subscribe(response => {
        this.service.spinnerHide();
        if(response['responseCode']==200){
          console.log(`static data is ${JSON.stringify(response['result'])}`)
     // this.body = response['result'][0].policy 
       this.body = this.sanitizer.bypassSecurityTrustHtml(response['result'].aboutUs)
        } else if(response['responseCode'] == 403){
          localStorage.removeItem('token')
          this.router.navigate(['/login'])
          this.service.error('Your token is expired!')
         } else if(response['responseCode']== 404){
          console.log(response['responseMessage'])
         }
         else {
          this.service.error(response['responseMessage']);  
         }
      },
      error=>{
        this.service.spinnerHide();
        this.service.error('Something went wrong.');
      }) 
     }
     
     else if(localStorage.sc == 'Terms & Conditions'){
     
      this.service.callGet('getTermAndCondition').subscribe(response => {
        this.service.spinnerHide();
        if(response['responseCode']==200){
          console.log(`static data is ${JSON.stringify(response['result'])}`)
        // this.body = response['result'].about
        this.body = this.sanitizer.bypassSecurityTrustHtml(response['result'].about)
        } else if(response['responseCode'] == 403){
          localStorage.removeItem('token')
          this.router.navigate(['/login'])
          this.service.error('Your token is expired!')
         } else if(response['responseCode']== 404){
          console.log(response['responseMessage'])
         }
         else {
          this.service.error(response['responseMessage']);  
         }
      },
      error=>{
        this.service.spinnerHide();
        this.service.error('Something went wrong.');
      }) 
     }
  
     else if(localStorage.sc == 'Privacy Policy'){
     
      this.service.callGet('getPrivacyPolicy').subscribe(response => {
        this.service.spinnerHide();
        if(response['responseCode']==200){
          console.log(`static data is ${JSON.stringify(response['result'])}`)
            // this.body = response['result'][0].policy
            this.body = this.sanitizer.bypassSecurityTrustHtml(response['result'].policy)
        } else if(response['responseCode'] == 403){
          localStorage.removeItem('token')
          this.router.navigate(['/login'])
          this.service.error('Your token is expired!')
         } else if(response['responseCode']== 404){
          console.log(response['responseMessage'])
         }
         else {
          this.service.error(response['responseMessage']);  
         }
      },
      error=>{
        this.service.spinnerHide();
        this.service.error('Something went wrong.');
      }) 
     }
  
  }
  
}

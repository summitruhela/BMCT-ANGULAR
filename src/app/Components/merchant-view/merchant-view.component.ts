import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../Services/provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-merchant-view',
  templateUrl: './merchant-view.component.html',
  styleUrls: ['./merchant-view.component.css']
})
export class MerchantViewComponent implements OnInit {
profile:any;
  constructor(private service:ProviderService, private router:Router) { }

  ngOnInit() {
    this.service.spinnerShow()
    this.viewMerchant()
  }
 
  back(){
this.router.navigate(['/merchant-management'])
  }
  
  viewMerchant(){
let view={
  "merchant_id":localStorage.merchantId
}
    this.service.callPost('merchantProfile', view).subscribe(response => {
      this.service.spinnerHide()     
       if(response['responseCode'] == 200){   
         this.profile = response['result']   
        
         console.log('PROFILE IS--->>>', this.profile) 
       } else if(response['responseCode']== 404){
        console.log(response['responseMessage'])
       } else if(response['responseCode'] == 403){
        localStorage.removeItem('token')
        this.router.navigate(['/login'])
        this.service.error('Your token is expired!')
       }
       else {
        this.service.error(response['responseMessage']);  
       }
    }, error =>{
      this.service.spinnerHide()
      this.service.error('Something went wrong!')
    })
  }

}

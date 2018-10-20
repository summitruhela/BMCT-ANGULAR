import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../Services/provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-admin-view',
  templateUrl: './sub-admin-view.component.html',
  styleUrls: ['./sub-admin-view.component.css']
})
export class SubAdminViewComponent implements OnInit {
  profile=[]
  constructor(private service:ProviderService, private router:Router) { }

  ngOnInit() {
    this.service.spinnerShow()
    this.getSubadminProfile()
  }
  getSubadminProfile(){
    let view={
      "_id":localStorage.subId
    }
        this.service.callPost('viewSubAdmin', view).subscribe(response => {
          this.service.spinnerHide()     
           if(response['responseCode'] == 200){   
             this.profile = response['result'][0]              
             console.log('PROFILE IS--->>>', this.profile) 
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
        }, error =>{
          this.service.spinnerHide()
          this.service.error('Something went wrong!')
        })
  }
  

}

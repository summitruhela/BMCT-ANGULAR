import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderService } from '../../Services/provider.service';

@Component({
  selector: 'app-banner-view',
  templateUrl: './banner-view.component.html',
  styleUrls: ['./banner-view.component.css']
})
export class BannerViewComponent implements OnInit {
bannerDetails:any=[]
image:any;
text:any;
  constructor(private router: Router, private service: ProviderService) { }

  ngOnInit() {
    this.service.spinnerShow()
    this.getBanner()
  }
  edit(){
    this.router.navigate(['/banner-edit'])
  }
  getBanner(){
    let bannerData = {
      banner_id:localStorage.bannerId
    }
    this.service.callPost('viewBanner', bannerData).subscribe(response => {
      this.service.spinnerHide()
     console.log('merchant pending api run')
       if(response['responseCode'] == 200){        
        this.bannerDetails = response['result']          
      
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

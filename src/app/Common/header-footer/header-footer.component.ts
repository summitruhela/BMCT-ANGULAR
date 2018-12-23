import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { ProviderService } from '../../Services/provider.service';
declare var $
@Component({
  selector: 'app-header-footer',
  templateUrl: './header-footer.component.html',
  styleUrls: ['./header-footer.component.css']
})
export class HeaderFooterComponent implements OnInit {
  activeTab:any;
  access:any = []
  
  constructor() { }

  ngOnInit() {
    let url = window.location.href.split('/')
    let page = url[url.length - 1]
    this.activeTab = page;
    
    this.access = JSON.parse(localStorage.token).result 
  }
  // dashoboard(){
  //   this.activeTab = 'dashboard'
  //   this.router.navigate(['/dashboard'])
  // }
  // merchant_management(){
  //   this.activeTab = 'merchant-management'
  //   this.router.navigate(['/merchant-management'])
  // }
  // banner_management(){
  //   this.activeTab = 'banner-management'
  //   this.router.navigate(['/banner-management'])
  // }
  // static_contents(){
  //   this.activeTab = 'static-contents'
  //   this.router.navigate(['/static-contents'])
  // }
  // change_password(){
  //   this.activeTab = 'change-password'
  //   this.router.navigate(['/change-password'])
  // }
  // subadmin_management(){
  //   this.activeTab = 'subadmin-management'
  //   this.router.navigate(['/subadmin-management'])
  // }
  // logout(){
  //   this.activeTab= 'logout'  
  // }
  // openSideMenu(){
  //   $("body").toggleClass("toggle-wrapper");

  // }
  // logoutYes(){
  //   this.service.spinnerShow()
  //     this.service.callGet('logout ').subscribe(response => {
  //       console.log(response)
  //   this.service.spinnerHide()   
  //    if(response['responseCode'] == 200){
  //     localStorage.removeItem('token')
  //   this.router.navigate(['/login'])
  //   $('#signout_modal').modal('hide');
  //    } else if(response['responseCode'] == 403 || response['responseCode'] == 401 ){
  //     localStorage.removeItem('token')
  //     $('#signout_modal').modal('hide');
  //     this.router.navigate(['/login'])      
  //     this.service.error('Your token is expired!')
  //    }
  //    else {
  //      console.log("API MSG CODE",response['responseCode'] )
  //    }
  // }, error =>{
  //   this.service.spinnerHide()  
  //   this.service.error('Something went wrong')
  // })
    
  // }

  // isInclude(val) {
  //   if(this.access) {
  //     // Sub admin
  //     if(val != 'sub') {
  //       if(this.access.length)
  //         return this.access.includes(val);
  //       else 
  //         return false;
  //     } else {
  //       return false
  //     }
      
  //     } else {
  //       // Admin
  //       return true;
  //     }
  //   }
    
}

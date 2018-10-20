import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../Services/provider.service';
import { Router } from '@angular/router';
declare var $;
@Component({
  selector: 'app-sub-admin-management',
  templateUrl: './sub-admin-management.component.html',
  styleUrls: ['./sub-admin-management.component.css']
})
export class SubAdminManagementComponent implements OnInit {
subAdmins=[]
pageSize:any=0
itemPP:any=5
currPage:any=1
srNo=0
  constructor(private service: ProviderService, private router: Router) { 
    $('[data-toggle="View"]').tooltip();    
    $('[data-toggle="Delete"]').tooltip();  
    $('[data-toggle="Block"]').tooltip(); 
  }

  ngOnInit() {
     this.service.spinnerShow()
    localStorage.removeItem('subId')
    this.getSubadminLists()
  }
  view(e){
    localStorage.subId = e._id
    this.router.navigate(['/subadmin-view'])
  }
  addSubadmin(){
    localStorage.removeItem('subId')
    localStorage.removeItem('email')
    this.router.navigate(['/subadmin-add'])
  }
  banModal(e){
    $('#block_modal').modal('show');
    localStorage.email = e.email
  }
  trashModal(e){
    $('#delete_modal').modal('show');
    localStorage.email = e.email
  }
  getSubadminLists(){
    console.log('GET LIST CALLED!!!!!')
   
   
    let subadmin={
      "page": this.currPage,
      "limit": parseInt($('#itemsPP').val()) 
         }  
        this.service.callPost('subAdminList', subadmin).subscribe(response => {
          this.service.spinnerHide()     
           if(response['responseCode'] == 200){  
            this.subAdmins = response['result'].docs
            this.pageSize = response['result'].total 
            console.log('TOTAL -->', this.pageSize)
            this.srNo = response['result'].limit * (response['result'].page - 1);         
            console.log('LIST IS-->>>', this.subAdmins)
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
  changePage(p){
    this.currPage = p
    this.getSubadminLists()
  }
  limitChange(){
    this.itemPP = parseInt($('#itemsPP').val())
    this.getSubadminLists()
  }
  banYes(){
    this.service.spinnerShow()
    let ban={
      "status":"block",
      "email":localStorage.email
    }
        this.service.callPost('blockAndDeleteSubAdmin', ban).subscribe(response => {
          $('#block_modal').modal('hide');
          this.service.spinnerHide()     
           if(response['responseCode'] == 200){            
            this.service.success('Sub admin banned')   
            this.getSubadminLists()          
           }  else if(response['responseCode'] == 403){
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
          $('#block_modal').modal('hide');
          this.service.spinnerHide()
          this.service.error('Something went wrong!')
        })
  }
  deleteYes(){
    this.service.spinnerShow()
    let del={
      "status":"delete",
      "email":localStorage.email
    }
        this.service.callPost('blockAndDeleteSubAdmin', del).subscribe(response => {
          $('#delete_modal').modal('hide');
          this.service.spinnerHide()     
           if(response['responseCode'] == 200){   
            this.service.success('Sub admin deleted successfully')
            this.getSubadminLists()
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
          $('#delete_modal').modal('hide');
          this.service.spinnerHide()
          this.service.error('Something went wrong!')
        })
  }
  clearSearch(){
    $('#searchData').val('')
    this.search()
  }
  search(){
 
      this.service.spinnerShow()
      let searchData = {
        "userName":$('#search').val(),
        "page":this.currPage
      }
      this.service.callPost('filterSubAdmin', searchData).subscribe(response => {
        this.service.spinnerHide()     
         if(response['responseCode'] == 200){  
          this.subAdmins = response['result'].docs
          this.pageSize = response['result'].total 
          console.log('TOTAL -->', this.pageSize)
          this.srNo = response['result'].limit * (response['result'].page - 1);         
          console.log('LIST IS-->>>', this.subAdmins)
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



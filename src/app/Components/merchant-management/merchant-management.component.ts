import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProviderService } from '../../Services/provider.service';
import { SocketService } from '../../Services/socket.service';
declare var $:any
@Component({
  selector: 'app-merchant-management',
  templateUrl: './merchant-management.component.html',
  styleUrls: ['./merchant-management.component.css']
})
export class MerchantManagementComponent implements OnInit {
  filterForm:FormGroup
  currPage1:any=1
  currPage2:any=1
  merchants:any=[]
  pendingMerchants:any=[]
  pageSize1:any=0
  pageSize2:any=0
  itemPP:any=5
  profile:any;
  // cuuTab:any='tab1'
  currTab: any = 1;
  constructor(private router:Router, private service: ProviderService, private socket:SocketService) { 
    $('[data-toggle="View"]').tooltip();  
    $('[data-toggle="Edit"]').tooltip();  
    $('[data-toggle="Delete"]').tooltip();  
    $('[data-toggle="Block"]').tooltip();  
    this.filterForm = new FormGroup({
      search: new FormControl('')
    })
  }

  ngOnInit() {   
    localStorage.removeItem('merchantId')
    this.service.spinnerShow()
    this.tab1()
  }
  toggleTab(val) {
    this.currTab = val
    this.currPage1 = 1
    this.currPage2 = 1
    val == 1 ? this.tab1() : this.tab2()

  }
  /* getTab1(){
    this.cuuTab='tab1'
    this.currPage1=1
    this.tab1()
  }
  getTab2(){
    this.cuuTab='tab2'
    this.currPage2=1
    this.tab2()
  } */
  tab1(){
    let merchantListData = {
      page:this.currPage1,
      limit: parseInt($('#itemsPP').val())
    }
    console.log(merchantListData)
    
    this.service.callPost('merchantView', merchantListData).subscribe(response => {
      this.service.spinnerHide()
     console.log('CHAL GYA')
       if(response['responseCode'] == 200){        
        this.merchants = response['result'].docs
        this.pageSize1 = response['result'].total
        // console.log('page size os tab 1', this.pageSize1)        
        // console.log('current page-->', this.currPage1)
        // console.log("API res tab1",response['result'] )
       }else if(response['responseCode'] == 403){
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
  view(e){
    console.log(e._id)
    localStorage.merchantId = e._id
     this.router.navigate(['/merchant-view'])
  }
  edit(e){
    localStorage.merchantId = e._id
    this.router.navigate(['/merchant-form'])
  }
  clearSearch(){
    $('#searchData').val('')
    this.search()
  }
  search(){
    let filterMerchantData
    if(this.currTab==1){
      filterMerchantData = {     
        search:$('#searchData').val(),
        status:"ACTIVE",
        limit: parseInt($('#itemsPP').val()),
        page:1
      }
      this.service.callPost('filterMerchant', filterMerchantData).subscribe(response => {
        this.service.spinnerHide()    
         if(response['responseCode'] == 200){        
          this.merchants = response['result'].docs
          this.pageSize1 = response['result'].total 
          console.log('page size os tab 1', this.pageSize1)        
          console.log('current page-->', this.currPage1)       
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
    else{
      filterMerchantData = {     
        search:$('#searchData').val(),
        status:"INACTIVE",
        limit: parseInt($('#itemsPP').val()),
        page:1
      }
      this.service.callPost('filterMerchant', filterMerchantData).subscribe(response => {
        this.service.spinnerHide()    
         if(response['responseCode'] == 200){        
          this.pendingMerchants = response['result'].docs
          this.pageSize2 = response['result'].total        
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

  delete(e){
    localStorage.merchantId = e._id
    $('#delete_modal').modal('show');
  }
  ban(e){
    localStorage.merchantId = e._id
    $('#block_modal').modal('show');
  }
  
  deleteYes(){
    this.service.spinnerShow()
   
    let merchantDData = {
      _id:localStorage.merchantId
    }
    this.service.callPost('deleteMerchant', merchantDData).subscribe(response => {
      this.service.spinnerHide()
     console.log('merchant pending api run')
       if(response['responseCode'] == 200){        
        this.service.success('Merchant Deleted')
        this.socket.refreshMessage('refreshed List')
        this.socket
          .getRefresh()
          .subscribe((message: any) => {
            console.log(`Respone of socket is ${JSON.stringify(message)}`)           
          })  
        $('#delete_modal').modal('hide');
       setTimeout(()=>{ this.tab1()}, 1000)
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
  blockYes(){
    this.service.spinnerShow()
    let banData = {
      _id:localStorage.merchantId
    }
    this.service.callPost('blockMerchant', banData).subscribe(response => {
      this.service.spinnerHide()     
       if(response['responseCode'] == 200){            
        console.log("response ",response)
        this.service.success('Merchant Blocked')
        this.socket
          .getRefresh()
          .subscribe((message: any) => {
            console.log(`Respone of socket is ${JSON.stringify(message)}`)           
          })  
        setTimeout(()=>{ this.tab1()}, 1000)
        $('#block_modal').modal('hide');
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
      $('#block_modal').modal('hide');
      this.service.spinnerHide()
      this.service.error('Something went wrong!')
    })
   
  }

  tab2(){
    this.service.spinnerShow()
    let merchantPendingListData = {
      page:this.currPage2,
      limit: parseInt($('#itemsPP').val())
    }
    this.service.callPost('merchantPending', merchantPendingListData).subscribe(response => {
      this.service.spinnerHide()
     console.log('merchant pending api run')
       if(response['responseCode'] == 200){        
        this.pendingMerchants = response['result'].docs
        this.pageSize2 = response['result'].total
        console.log('2 TOTAL PAGE-->', this.pageSize2)
        console.log("API MSG CODE",this.pendingMerchants )
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
  changePage1(p){
    this.currPage1 = p
    this.tab1()
  }
  changePage2(p){
    this.currPage2 = p
    this.tab2()
  }
  limitChange(){
    this.itemPP = parseInt($('#itemsPP').val())
    this.toggleTab(this.currTab)
    // this.getTab1()
    // this.getTab2()
  }

  approve(pending){
    this.service.spinnerShow()
    localStorage.merchantId = pending._id
    let merchantAData = {
      _id:localStorage.merchantId
    }
    this.service.callPost('activeStatus', merchantAData).subscribe(response => {
      this.service.spinnerHide()
     console.log('merchant pending api run')
       if(response['responseCode'] == 200){ 
        this.socket.refreshMessage('refreshed List')
        this.socket
          .getRefresh()
          .subscribe((message: any) => {
            console.log(`Respone of socket is ${JSON.stringify(message)}`)
           
          })       
        this.service.success('Request Approved')
        this.tab2();
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
  viewMer(pending){
    this.service.spinnerShow()
    let view={
      "merchant_id":pending._id
    }
        this.service.callPost('merchantProfile', view).subscribe(response => {
          this.service.spinnerHide()     
           if(response['responseCode'] == 200){   
             this.profile = response['result']               
             
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
  reject(){
    this.service.spinnerShow()
    let merchantDData = {
      _id:localStorage.merchantId
    }
    this.service.callPost('deleteMerchant', merchantDData).subscribe(response => {
      this.service.spinnerHide()
     console.log('merchant pending api run')
       if(response['responseCode'] == 200){        
        this.service.success('Request Deleted')
        this.socket
          .getRefresh()
          .subscribe((message: any) => {
            console.log(`Respone of socket is ${JSON.stringify(message)}`)           
          })  
        $('#delet_farms_modal').modal('hide');
        this.tab2();
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
  notapprove(e){
    localStorage.merchantId = e._id  

  }
  addMerchant(){
    this.service.pageIs='addMerchant'
    this.router.navigate(['/merchant-form'])
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderService } from '../../Services/provider.service';
declare var $:any
@Component({
  selector: 'app-banner-management',
  templateUrl: './banner-management.component.html',
  styleUrls: ['./banner-management.component.css']
})
export class BannerManagementComponent implements OnInit {
currPage:any=1
bannerArray:any=[]
itemPP:any=5
pageSize:any=0
search: any;
srNo: any;

  constructor(private router: Router, private service: ProviderService) { 

    $("#searchData").on("keypress", function(e) {
      if (e.which === 32 && !this.value.length)
        e.preventDefault();
    });
    $('[data-toggle="View"]').tooltip();   
    $('[data-toggle="Edit"]').tooltip();   
    $('[data-toggle="Delete"]').tooltip();   
  }

  ngOnInit() {
    localStorage.removeItem('bannerId')
    this.service.pageIs=''
    this.service.spinnerShow()
    this.bannersList()
  }
  view(e){
    localStorage.bannerId = e._id
    console.log('view clicked!',e._id)
    this.router.navigate(['/banner-view'])

  }
  edit(e){
    localStorage.bannerId = e._id
    console.log('edit clicked!',e._id)
    this.router.navigate(['/banner-edit'])
  }
  delete(e){
    localStorage.bannerId = e._id
    $('#delete_modal').modal('show');
    console.log('delete clicked!',e._id)
  }
  addBanner(){
    this.service.pageIs='addBanner'
    this.router.navigate(['/banner-edit'])
  }
  bannersList(){
    // this.service.spinnerShow()
    let bannerData = {
      page:this.currPage,
      limit:this.itemPP,
      text: this.search
    }
    this.service.callPost('bannerlist', bannerData).subscribe(response => {
      this.service.spinnerHide()
      console.log('CHAL GYAaaaaaa')
       if(response['responseCode'] == 200){       
        this.bannerArray = response['result'].docs
        console.log("API RESULT-->",response['result'].total )
        this.pageSize = response['result'].total
        this.srNo = response['result'].limit * (response['result'].page - 1);
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

  deleteYes(){
    this.service.spinnerShow()
    let bannerData = {
      "_id":localStorage.bannerId
    }
    this.service.callPost('deleteBanner', bannerData).subscribe(response => {
      this.service.spinnerHide()    
       if(response['responseCode'] == 200){ 
        $('#delete_modal').modal('hide'); 
        this.bannersList()      
  this.service.success('Banner Deleted')
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
    this.bannersList()
  }
  limitChange(){
    this.itemPP = parseInt($('#itemsPP').val())
    this.bannersList()    
  }
  clearSearch(){
    $('#searchData').val('')
    this.searchFilter()
  }
  searchFilter(){
    this.service.spinnerShow()
    console.log('SEARCH BUTTON CLICKEDDD')
   
    let filterMerchantData = {     
      text:$('#searchData').val(),      
      limit: parseInt($('#itemsPP').val()),
      page:1
    }
    this.service.callPost('filterBanner', filterMerchantData).subscribe(response => {
      this.service.spinnerHide()    
       if(response['responseCode'] == 200){        
        this.bannerArray = response['result'].docs
        this.pageSize = response['result'].total
        this.srNo = response['result'].limit * (response['result'].page - 1);  
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
      this.service.error('Something went wrong')
    })
   
  }

  
}

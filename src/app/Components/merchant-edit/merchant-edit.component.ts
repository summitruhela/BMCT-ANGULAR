import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../Services/provider.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-merchant-edit',
  templateUrl: './merchant-edit.component.html',
  styleUrls: ['./merchant-edit.component.css']
})
export class MerchantEditComponent implements OnInit {
profile:any
merchantForm:FormGroup
imageUrl='assets/img/profile-img.jpg'
  image:any;
codeArray: any = [];
  stateArray: any=[]
  countryArray:any=[]
  constructor(private service:ProviderService, private router:Router) {
    
    this.merchantForm = new FormGroup({
      fname: new FormControl('',[Validators.required]),
      lname: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      prefix: new FormControl('',[Validators.required]),
      phoneNum: new FormControl('',[Validators.required]),
      country: new FormControl('',[Validators.required]),
      state: new FormControl('',[Validators.required]),
      addLine1: new FormControl('',[Validators.required]),    
      website: new FormControl('',[Validators.required]),
      image: new FormControl('',)
    })
   }

  ngOnInit() {
    
    if(this.service.pageIs=='addMerchant'){

    }
    else{
      this.service.spinnerShow()
      this.viewMerchant()
    }
   
    this.getCountryCodesList();

  }
  getCountryCodesList(){
    this.service.getCountryCodeJson().subscribe(response => {     
      this.codeArray = response['countries'];
      this.countryArray = response['countries']
    },
    error => {
      console.log(`Error is ${JSON.stringify(error)}`)
    })
  }
    
  viewMerchant(){
    let view={
      "merchant_id":localStorage.merchantId
    }
        this.service.callPost('merchantProfile', view).subscribe(response => {
          this.service.spinnerHide()     
           if(response['responseCode'] == 200){   
             this.profile = response['result']   
            this.merchantForm.patchValue({
              fname: this.profile.fName,
              lname: this.profile.lName,
              email: this.profile.email_ID,
              phoneNum:this.profile.phoneNumber,
              password:this.profile.password,
              website:this.profile.merchantWebsite,
              state:this.profile.location.state,
              country:this.profile.location.country,
              addLine1:this.profile.location.addLine1
             
            })
            this.imageUrl= this.profile.logo           
        
               
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
          this.service.error('ERROR')
        })
      }
      save(){
        this.service.clear()
        this.service.spinnerShow()
        let profileDetails={
         merchant_id: localStorage.merchantId, 
                 fName: this.merchantForm.value.fname,
                 lName: this.merchantForm.value.lname,
                 email_ID: this.merchantForm.value.email,
                 phoneNumber: this.merchantForm.value.phoneNum,
                 password: this.merchantForm.value.password,
                 location: {
                             state: this.merchantForm.value.state,
                             country: this.merchantForm.value.country,
                             addLine1: this.merchantForm.value.addLine1
                         },
         
                 merchantWebsite: this.merchantForm.value.website,
                 logo:this.imageUrl
             }
         console.log('TO SEND-->', profileDetails)
            this.service.callPost('editMerchant', profileDetails).subscribe(response => {
              this.service.spinnerHide()     
               if(response['responseCode'] == 200){  
                 console.log('') 
                this.router.navigate(['/merchant-management'])              
                
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
      back(){
        this.router.navigate(['/merchant-management'])
      }

      countryChange(e){
        console.log('event is--> e', (e))
        let indx = this.countryArray.findIndex(x => x.country==e);
        
                if(indx>0){
                  this.stateArray = this.codeArray[indx].states
                  console.log(this.stateArray)
                }        
              }

      fileSelect(event){
        var self = this;
        if(event.target.files && event.target.files[0] ){
          var fileType=event.target.files[0].type			
          if(fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg' || fileType === 'image/ico'){				
            this.image = event.target.files[0]		
            var reader = new FileReader()
            reader.onload = (e) =>  {
                    self.imageUrl = e.target['result']
                    this.image =e.target['result']  
                    console.log('IMAGE--->',this.image)
          console.log('IMAGE URL--->',this.imageUrl)     
              }
              reader.readAsDataURL(event.target.files[0])	            
        }
          else {		     
            this.image = ''				
            //this.imageUrl = '';
                    self.imageUrl= 'assets/img/profile-img.jpg';
                    this.imageUrl='assets/img/profile-img.jpg'	
                    this.service.error('Please select image file only !')						
              }			
        }
      }

}

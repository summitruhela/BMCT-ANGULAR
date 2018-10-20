import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProviderService } from '../../Services/provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-admin-add',
  templateUrl: './sub-admin-add.component.html',
  styleUrls: ['./sub-admin-add.component.css']
})
export class SubAdminAddComponent implements OnInit {
  subadminForm:FormGroup
  image:any
  imageUrl:any=''
  profile: any;
  edit:any=false
  constructor(private service:ProviderService, private router:Router) {
    this.subadminForm = new FormGroup({
      name: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z ]{2,40}$/)]),
      email: new FormControl('',[Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,3})$/)]),
      phone: new FormControl('',[Validators.required, , Validators.minLength(7), Validators.pattern(/^[1-9][0-9][0-9]{5,12}$/)]),
      password: new FormControl('',[ Validators.minLength(8)]),
      confirmPassword: new FormControl('',[ Validators.minLength(8)]),
      accessMerchant: new FormControl(''),
      accessBanner: new FormControl(''),
      accessStatic: new FormControl(''),
     
    })
   }

  ngOnInit() {
    if(localStorage.subId){
      this.service.spinnerShow()
      this.getSubadminProfile()
      this.edit=true
    }
    else{
      this.subadminForm.get('password').setValidators([Validators.required,Validators.minLength(8)]);
      this.subadminForm.get('confirmPassword').setValidators([Validators.required,Validators.minLength(8)]);
    }
    
    
  }
  save(){ 
    window.scrollTo(0,0)
    this.service.clear()
    this.service.spinnerShow()
    if(this.edit){
      let access = []
      if(this.subadminForm.value.accessMerchant){ access.push('merchantManagement')}
      if(this.subadminForm.value.accessBanner){ access.push('bannerManagement')}
      if(this.subadminForm.value.accessStatic){ access.push('staticContentManagement')}
      let subadmin={
        "_id":localStorage.subId,
        "name":this.subadminForm.value.name,
        "email":this.subadminForm.value.email,
        "phoneNumber":this.subadminForm.value.phone,
        "access":access,
        "image":this.imageUrl,
        "password":this.subadminForm.value.password
           }
          //  for (let val in subadmin) 
          //  {
          //      if (subadmin[val] == '') 
          //      {
          //          delete subadmin[val]
          //      }
          //  }
    
          this.service.callPost('editSubAdmin', subadmin).subscribe(response => {
            this.subadminForm.reset()
            this.service.spinnerHide()     
             if(response['responseCode'] == 200){  
               this.service.success('Sub admin added successfully')
              this.router.navigate(['/subadmin-management'])              
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
            this.subadminForm.reset()
            this.service.spinnerHide()
            this.service.error('Something went wrong!')
          })

  }
  else{
    let access = []
    if(this.subadminForm.value.accessMerchant){ access.push('merchantManagement')}
    if(this.subadminForm.value.accessBanner){ access.push('bannerManagement')}
    if(this.subadminForm.value.accessStatic){ access.push('staticContentManagement')}
    let subadmin={
      "name":this.subadminForm.value.name,
      "email":this.subadminForm.value.email,
      "phoneNumber":this.subadminForm.value.phone,
      "access":access,
      "image":this.imageUrl,
      "password":this.subadminForm.value.password || this.profile.password
         }
  
        this.service.callPost('addSubAdmin', subadmin).subscribe(response => {
          this.subadminForm.reset()
          this.service.spinnerHide()     
           if(response['responseCode'] == 200){  
             this.service.success('Sub admin added successfully')
            this.router.navigate(['/subadmin-management'])    
           } else if(response['responseCode'] == 403){
            localStorage.removeItem('token')
            this.router.navigate(['/login'])
            this.service.error('Your token is expired!')
           } else if(response['responseCode']== 404){
            this.service.error(response['responseMessage'])
           }
           else {
            this.service.error(response['responseMessage']);  
           }
        }, error =>{
          this.subadminForm.reset()
          this.service.spinnerHide()
          this.service.error('Something went wrong!')
        })
  }
        
              

  }
  cancel(){
    this.router.navigate(['/subadmin-management'])        
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
               
                console.log('IMAGE--->',this.image)
      console.log('IMAGE URL--->',this.imageUrl)     
          }
          reader.readAsDataURL(event.target.files[0])	            
    }
      else {		     
        // this.image = ''				
        //this.imageUrl = '';
                self.imageUrl= '';               	
                this.service.error('Please select image file only !')						
          }			
    }
  }
  getSubadminProfile(){
    let view={
      "_id":localStorage.subId
    }
        this.service.callPost('viewSubAdmin', view).subscribe(response => {
          this.service.spinnerHide()     
           if(response['responseCode'] == 200){   
             this.profile = response['result'][0]  
              this.subadminForm.patchValue({
                name:this.profile.name,
                email:this.profile.email,
                phone:this.profile.phoneNumber,
                // password:this.profile.password.slice(0,5),
                // confirmPassword:this.profile.password.slice(0,5),
                accessMerchant:this.profile.access[0] ? true : false,
                accessBanner:this.profile.access[1] ? true : false,
                accessStatic:this.profile.access[2] ? true : false,
                // image:this.profile.image
              })
              this.imageUrl= this.profile.image
            
             console.log('PROFILE IS--->>>', this.profile) 
           } else if(response['responseCode'] == 403){
            localStorage.removeItem('token')
            this.router.navigate(['/login'])
            this.service.error('Your token is expired!')
           } else if(response['responseCode'] == 404){
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

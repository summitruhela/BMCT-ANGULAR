import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProviderService } from '../../Services/provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner-edit',
  templateUrl: './banner-edit.component.html',
  styleUrls: ['./banner-edit.component.css']
})
export class BannerEditComponent implements OnInit {
  bannerForm:FormGroup
  imageUrl = ''
  image:any;
  bannerDetails:any;
  constructor(private service: ProviderService, private router: Router) { 
    this.bannerForm = new FormGroup({
      description : new FormControl('',[Validators.required, Validators.minLength(10)])
    })
  } 

  ngOnInit() {
    
    if(localStorage.bannerId){
           this.service.spinnerShow()
          this.getBanner()
    }
    else{
    localStorage.removeItem('bannerId')
    }
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
      this.bannerForm.patchValue({        
        description:this.bannerDetails.text,
        // image:this.bannerDetails.banners
      })
      this.imageUrl = this.bannerDetails.banners
       } else if(response['responseCode'] == 403){
        localStorage.removeItem('token')
        this.router.navigate(['/login'])
        this.service.error('Your token is expired!')
       }
       else if(response['responseCode']== 404){
         console.log('merchant pending api run')
       }
       else {
        this.service.error(response['responseMessage']);  
       }
    }, error =>{
      this.service.spinnerHide()
      this.service.error('Something went wrong')
    })
  }
  save(){
    this.bannerForm.controls['description'].setErrors({'incorrect': true});
    this.service.spinnerShow()
    if(this.service.pageIs === 'addBanner'){
      let bannerData = {
        banners:this.imageUrl,
        text:this.bannerForm.value.description       
      }
      console.log('DATA SENT===>>>', bannerData)
      this.service.callPost('addBanner', bannerData).subscribe(response => {        
         
        if(response['responseCode'] == 200){        
          this.service.success('banner added successfully.')
          this.router.navigate(['/banner-management'])          
        } else if(response['responseCode'] == 403){
          localStorage.removeItem('token')
          this.router.navigate(['/login'])
          this.service.error('Your token is expired!')
         } else if(response['responseCode']== 404){
          this.service.error('Your token is expired !');         
           localStorage.removeItem('token')
           this.router.navigate(['/login'])
        }
        else {
          console.log("API MSG CODE",response['responseCode'] )
        }
        this.service.spinnerHide()   
      }, error =>{
        this.service.spinnerHide()
        this.service.error('ERROR')
      })
    }
    else{
            let bannerData = {
              banners:this.imageUrl,
              text:this.bannerForm.value.description,
              _id:localStorage.bannerId
            }
            console.log('DATA SENT===>>>', bannerData)
            this.service.callPost('editBanner', bannerData).subscribe(response => {
              console.log('CHAL GYA !!!')
              this.service.spinnerHide()     
              if(response['responseCode'] == 200){        
                this.service.success('banner editted successfully.')
                this.router.navigate(['/banner-management'])
                console.log("API MSG CODE",response['response_message'] )
              } else if(response['responseCode'] == 403){
                localStorage.removeItem('token')
                this.router.navigate(['/login'])
                this.service.error('Your token is expired!')
               }
              else {
                console.log("API MSG CODE",response['responseCode'] )
              }
            }, error =>{
              this.service.spinnerHide()
              this.service.error('ERROR')
            })
        }
    this.service.spinnerShow()

  }

  back(){
    this.router.navigate(['/banner-management'])
  }

  fileSelect(event){
    var self = this;
		if(event.target.files && event.target.files[0] ){
			var fileType=event.target.files[0].type			
			if(fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg'){				
				this.image = event.target.files[0]		
				var reader = new FileReader()
				reader.onload = (e) =>  {
                self.imageUrl = e.target['result']
			    }
			    reader.readAsDataURL(event.target.files[0])			}
			else {		     
                self.imageUrl= '';
                this.service.error('Please select image file only !')						
			   }			
		}
  }

}

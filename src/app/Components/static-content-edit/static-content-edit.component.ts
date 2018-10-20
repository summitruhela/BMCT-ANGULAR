import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderService } from '../../Services/provider.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-static-content-edit',
  templateUrl: './static-content-edit.component.html',
  styleUrls: ['./static-content-edit.component.css']
})
export class StaticContentEditComponent implements OnInit {
  staticForm:FormGroup
  title:any;
  ckEditorConfig:any =  {         
          "removeButtons":"Source,Save,Templates,Find,Replace,Scayt,SelectAll,Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,About,Form,Checkbox,Radio,BulletedList"
         }
        
  public editorValue: string = '';
  constructor(private router:Router, private service: ProviderService) { 
    this.staticForm = new FormGroup({
      title: new FormControl(''),
      body: new FormControl('',[Validators.required])
    })
  }

  ngOnInit() {
    this.title = localStorage.sc
    this.service.spinnerShow()
    this.getStaticView()
  }
  getStaticView(){
    this.title= localStorage.sc
        if(localStorage.sc == 'About Us'){
         
          this.service.callGet('getAboutUs').subscribe(response => {
            this.service.spinnerHide();
            if(response['responseCode']==200){
              console.log(`static data is ${JSON.stringify(response['result'])}`)
              this.staticForm.patchValue({
                body: response['result'].aboutUs
              })
              console.log("ABOUT US-->>", this.staticForm.value.body)
      // this.body = response['result'][0].policy
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
          },
          error=>{
            this.service.spinnerHide();
            this.service.error('Something went wrong.');
          }) 
         }
         
         else if(localStorage.sc == 'Terms & Conditions'){
         
          this.service.callGet('getTermAndCondition').subscribe(response => {
            this.service.spinnerHide();
            if(response['responseCode']==200){
              console.log(`static data is ${JSON.stringify(response['result'])}`)
      // this.body = response['result'].about
            this.staticForm.patchValue({
              body:response['result'].about
            })
            console.log("TERMS-->>", this.staticForm.value.body)
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
          },
          error=>{
            this.service.spinnerHide();
            this.service.error('Something went wrong.');
          }) 
         }
      
         else if(localStorage.sc == 'Privacy Policy'){
         
          this.service.callGet('getPrivacyPolicy').subscribe(response => {
            this.service.spinnerHide();
            if(response['responseCode']==200){
              console.log(`static data is ${JSON.stringify(response['result'])}`)
              this.staticForm.patchValue({
                body:response['result'].policy
              })
              console.log("POLICY -->>", this.staticForm.value.body)
                // this.body = response['result'][0].policy
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
          },
          error=>{
            this.service.spinnerHide();
            this.service.error('Something went wrong.');
          }) 
         }
      
      }

  save(){
   window.scrollTo(0,0)
   
   this.service.spinnerShow()
   let staticdata = {
     about : this.staticForm.value.body
   }
   if(localStorage.sc == 'About Us'){
    this.service.callPost('addAboutUs', staticdata).subscribe(response => {
      this.service.spinnerHide()
      this.staticForm.reset()
       if(response['responseCode'] == 200){
        
        this.service.success('Content updated successfully')
        this.router.navigate(['/static-contents'])  
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
      this.staticForm.reset()
      this.service.spinnerHide()
      this.service.error('Something went wrong!')
    })
   }
   
   else if(localStorage.sc == 'Terms & Conditions'){
    this.service.callPost('addTermAndCondition', staticdata).subscribe(response => {
      this.service.spinnerHide()
      this.staticForm.reset()
       if(response['responseCode'] == 200){
        this.service.success('Content updated successfully')
        this.router.navigate(['/static-contents'])  
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
      this.staticForm.reset()
      this.service.spinnerHide()
      this.service.error('Something went wrong!')
    })
   }

   else if(localStorage.sc == 'Privacy Policy'){
    this.service.callPost('addPrivacyPolicy', staticdata).subscribe(response => {
      this.service.spinnerHide()
      this.staticForm.reset()
       if(response['responseCode'] == 200){
        this.service.success('Content updated successfully')
        this.router.navigate(['/static-contents'])  
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
      this.staticForm.reset()
      this.service.spinnerHide()
      this.service.error('Something went wrong!')
    })
   }

  }
  cancel(){
this.router.navigate(['/static-contents'])
  }

}

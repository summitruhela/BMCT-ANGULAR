import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProviderService } from '../../Services/provider.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgetForm:FormGroup
  constructor(private router:Router, private service: ProviderService) {
    this.forgetForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,3})$/)])
    })
   }

  ngOnInit() {
  }
  submit(){
    this.service.spinnerShow()
let forgotData = {
  "email": this.forgetForm.value.email
}
this.service.postApi('forgotPassword', forgotData).subscribe(response => {
  this.service.spinnerHide()
 
   if(response['responseCode'] == 200){    
    this.router.navigate(['/login'])
    this.service.success(response['responseMessage'])
    
   } else if(response['responseCode'] == 403){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
    this.service.error('Your token is expired!')
   } else if(response['responseCode']== 404){
    this.service.error('Email not found')
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

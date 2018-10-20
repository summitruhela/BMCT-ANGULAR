import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProviderService } from '../../Services/provider.service';
import { Router } from '@angular/router';
declare var $:any
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm:FormGroup
  constructor(private service: ProviderService, private router: Router) { 
    this.passwordForm = new FormGroup({
      oldPassword: new FormControl('',[Validators.required, Validators.minLength(8)]),
      newPassword: new FormControl('',[Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('',[Validators.required, Validators.minLength(8)])
    })
    $("#newPassword, #confirmPassword").on("keypress", function(e) {
      if (e.which === 32 && !this.value.length)
        e.preventDefault();
    });
  } 

  ngOnInit() {
  }
  OK(){
    this.service.spinnerShow()
    let changeData = {
      oldPassword:this.passwordForm.value.oldPassword,
      newPassword:this.passwordForm.value.newPassword,
	    confirmPassword:this.passwordForm.value.confirmPassword
    }
    this.service.callPost('changePassword', changeData).subscribe(response => {
      this.service.spinnerHide()
     console.log('CHAL GYA')
       if(response['responseCode'] == 200){        
        this.service.success('Password changed successfully.')
        this.router.navigate(['/dashboard'])
        console.log("API MSG CODE",response['response_message'] )
       } else if(response['responseCode'] == 403){
        localStorage.removeItem('token')
        this.router.navigate(['/login'])
        this.service.error('Your token is expired!')
       } else if(response['responseCode']== 401){
        this.service.error('Please do not enter old password')
       }
       else if(response['responseCode']== 404){
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

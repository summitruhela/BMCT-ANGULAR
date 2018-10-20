import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProviderService } from '../../Services/provider.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm:FormGroup
  constructor(private service: ProviderService, private route : ActivatedRoute, private router: Router) { 
    this.resetForm = new FormGroup({
      newPassword: new FormControl('',[Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('',[Validators.required, Validators.minLength(8)])
    })
  }

  ngOnInit() {
    console.log("qqwertyui",this.route.queryParams['_value']._id)
  }
  submit(){
    this.service.spinnerShow()
    let resetData = {
      Password : this.resetForm.value.newPassword,
      confirmPassword : this.resetForm.value.confirmPassword,
      _id : this.route.queryParams['_value']._id
    }
    console.log(this.route.queryParams['_value'].token)
    this.service.postApi('resetPassword', resetData).subscribe(response => {
      this.service.spinnerHide()     
       if(response['responseCode'] == 200){        
        this.service.success('Password changed successfully.')
        this.router.navigate(['/login'])  
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

}

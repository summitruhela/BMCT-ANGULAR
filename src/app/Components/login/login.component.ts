import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProviderService } from '../../Services/provider.service';
import { CookieService } from 'ngx-cookie-service';
declare var $: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  constructor(private router: Router, private service: ProviderService, private cookieService: CookieService) {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,3})$/)]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)]),
      remember: new FormControl('')
    })
   }

  ngOnInit() {
    $(function() {
      $('#email, #password').on('keypress', function(e) {
        if (e.which == 32)
          return false;
      });
    });
    this.loginForm.patchValue({
      email: this.cookieService.get('email'),
      password: this.cookieService.get('password'),
      remember: this.cookieService.check('remember')
    })
  }
  
  login(){ 
    this.service.clear()
    this.service.spinnerShow()
    console.log('email-->'+this.loginForm.value.email+', pass -->'+ this.loginForm.value.password)
    console.log('LOGIN CLICKED')

    let loginData = {
      "email":this.loginForm.value.email,
      "password":this.loginForm.value.password
    }

    this.service.postApi('login', loginData).subscribe(response => {
      this.service.spinnerHide()
     
       if(response['responseCode'] == 200){
        localStorage.token = JSON.stringify({token: response.token, result: response.result})
        this.service.success('Successfully login')
        this.router.navigate(['/dashboard'])
        if (this.loginForm.controls['remember'].value == true) {
          this.cookieService.set('email', this.loginForm.controls['email'].value)
          this.cookieService.set('password', this.loginForm.controls['password'].value)
          this.cookieService.set('remember', this.loginForm.controls['remember'].value)
        } 
        else {
          this.cookieService.delete('email')
          this.cookieService.delete('password')
          this.cookieService.delete('remember')
        }

        console.log('API MSG CODE 200')
        
       } else if(response['responseCode'] == 403){
        localStorage.removeItem('token')
        this.router.navigate(['/login'])
        this.service.error('Your token is expired!')
       } else if(response['responseCode'] == 404){
        this.service.error(response['responseMessage'])
       }  
            
       else {
        this.service.error(response['responseMessage'])
       }
    }, error =>{
      this.service.spinnerHide()
      this.service.error('Something went wrong!')
    })
    
    // this.router.navigate(['/dashboard'])
    // this.service.success('login successful')
  }

}

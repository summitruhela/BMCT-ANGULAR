import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/provider.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-waki-login',
  templateUrl: './waki-login.component.html',
  styleUrls: ['./waki-login.component.css']
})
export class WakiLoginComponent implements OnInit {
//  public myForm: FormGroup;
  formgroup: any;

  email: any;
  responseData: any;
  constructor(private formBuilder: FormBuilder, public route: Router, public service: DataService) {
    this.formgroup = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[A-Z0-9_-]+([\.-][A-Z0-9_-]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,4})+$/i)])],
      // pass: ['', Validators.required]
    });
  }
  ngOnInit() {

  }
  login(val) {
    console.log(this.formgroup.value)
    console.log(val)
    let logindata =
    {
      "email": val.email,
      "lang": "en"

    }
    console.log(logindata)
    this.service.postApi('user/checkEmail', logindata, 0).subscribe(response => {

      this.responseData = response;
      console.log("WWWWWWWW", this.responseData)
      if (response['statusCode'] == 200 ) {
        this.service.showSuccess("Please enter password");
        localStorage.setItem('email', val.email)
        // localStorage.setItem('adminId', this.responseData.result._id)
        console.log('successfully login', response['statusMessage'])
        this.route.navigate(['/enterPassword']);
        // localStorage.token = response[`data`][`token`];
        // localStorage.adminId = response[`data`][`_id`];
      }
      else {
        this.service.showError('Invalid Email')
        //  this.service.showError('Invalid email or password.')
      }
    }, error => {
      console.log('error occur', error)
      this.service.showError('Server Error')
    })
  }

}

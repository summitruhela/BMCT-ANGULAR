import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/provider.service';

@Component({
  selector: 'app-enter-password-screen',
  templateUrl: './enter-password-screen.component.html',
  styleUrls: ['./enter-password-screen.component.css']
})
export class EnterPasswordScreenComponent implements OnInit {
  formgroup: any;
  responseData: any;
  constructor(private formBuilder: FormBuilder, public route: Router, public service: DataService) {
    this.formgroup = formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,20}/)])],
    });
  }

  ngOnInit() {
  }

  login(val) {

    console.log("this is ===>>", this.formgroup.value)

    let logindata =
    {
      "email": localStorage.getItem('email'),
      "password": val.password,
      "lang": "en"

    }
    // console.log("########", logindata)
    this.service.postApi('user/login', logindata, 0).subscribe(response => {

      this.responseData = response;
      // console.log("WWWWWWWW", this.responseData)
      if (response['statusCode'] == 200) {
        this.service.showSuccess(response['statusMessage']);
        localStorage.setItem('token', this.responseData.accessToken)
        localStorage.removeItem('email')
        this.route.navigate(['/business_details']);
      }
      else {
        this.service.showError('Invalid password.')
        //this.service.showError('Invalid email or password.')
      }
    }, error => {
      console.log('error occur', error)
      this.service.showError('Server Error')
    })
  }

}

import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ServiceService {
  //  baseUrl: String = 'http://172.16.16.220:1419/v1/'; 
   baseUrl:String = 'http://ec2-52-76-162-65.ap-southeast-1.compute.amazonaws.com:1419/v1/'
  constructor(private spinner:NgxSpinnerService, private http:HttpClient, private toaster: ToastrService) {  }

  showSpinner(){
    this.spinner.show();
  }

  hideSpinner(){
    this.spinner.hide();
  }

  toastSucc(msg) {
    console.log("succ called")
		this.toaster.success(msg)
	}
	toastErr(msg) {
		this.toaster.error(msg)
	}

  getCountryCodeJson(){
    return this.http.get('assets/json/countryCodes.json');
  }

  getApi(url, isHeader){
    if(isHeader==0)
      return this.http.get(this.baseUrl+url)
    else{
        var httpOptions = {
          headers: new HttpHeaders({'Content-Type':"application/json"})
        }
        return this.http.get((this.baseUrl+url),httpOptions)
    }
  }

  postApi(url, data, isHeader){
    if(isHeader==0)
      return this.http.post(this.baseUrl+url, data)
    else{
        var httpOptions = {
          headers: new HttpHeaders({'Content-Type':"application/json"})
        }
        return this.http.post((this.baseUrl+url),data,httpOptions)
    }
  }

}

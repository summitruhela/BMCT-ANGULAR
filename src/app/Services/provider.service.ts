import { Injectable } from '@angular/core';
import { ToastrService} from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  pageIs:any=''
    // baseUrl='http://172.16.16.220:1419/v2/'
   baseUrl='http://ec2-52-76-162-65.ap-southeast-1.compute.amazonaws.com:1419/v2/'
getHttpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}
  constructor(private toastr: ToastrService, public http: HttpClient, private spinner: NgxSpinnerService) { }
  success(msg){
    this.toastr.success(msg)
  }
  clear(){
    this.toastr.clear()
  }

  error(msg){
    this.toastr.error(msg)
  }

  getApi(url) {   
		return this.http.get(this.baseUrl + url, this.getHttpOptions);
	}

	postApi(url, data): Observable<any> {
		return this.http.post(this.baseUrl + url,data, this.getHttpOptions);
  }
  getCountryCodeJson(){
    return this.http.get('assets/json/countryCodes.json');
  }
  getCountryCJson(){
    return this.http.get('assets/json/countries.json');
  }

  callGet(url){
  
    let HttpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'token': JSON.parse(localStorage.token).token
      })
    }
    return this.http.get(this.baseUrl + url, HttpOptions);
  }

  callPost(url, data){
  let HttpOptions = {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          'token': JSON.parse(localStorage.token).token
        })
      }
    return this.http.post(this.baseUrl + url,data, HttpOptions);
  }
  
  spinnerShow(){
    this.spinner.show()
  }
  spinnerHide(){
    this.spinner.hide()
  }
}

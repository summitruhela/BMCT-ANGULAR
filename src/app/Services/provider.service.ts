
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  userdata = {}
  nameClicked = { 'userName': '', 'email': '', 'mobileNumber': '' }
  edit_id: any;
  editdata: any;
  optionSubject = new Subject();
  optionObs = this.optionSubject.asObservable();
  constructor(private http: HttpClient, private toastr: ToastrService) { }
  baseUrl='http://13.126.131.184:5050/' //!live 

  typeLogin: string;
  changeOption(msg) {
    this.optionSubject.next(msg)
  }
  postApi(url, data, isHeader): Observable<any> {
    console.log(`entered in post api `)
    if (isHeader == 0) {
      console.log(`header 0`)
      var httpOptions;
      httpOptions = {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      }
      return this.http.post((this.baseUrl + url), data, httpOptions)
    }
    else if (isHeader == 1) {
      var httpOptions;
      httpOptions = {

        headers: new HttpHeaders({
          "accessToken": localStorage.getItem("token"),
          // "_id": localStorage.adminId,
          "Content-Type": "application/json"
        })
      }
      return this.http.post((this.baseUrl + url), data, httpOptions)
    }
  }
  getApi(url, isHeader) {
    if (isHeader == 0) {
      var httpOptions;
      httpOptions = {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      }
      return this.http.get((this.baseUrl + url), httpOptions)
    }
    else if (isHeader == 1) {
      console.log('token', localStorage.token)
      var httpOptions;
      httpOptions = {
        headers: new HttpHeaders({ "token": localStorage.token, "_id": localStorage.adminId, "Content-Type": "application/json" })
      }
      return this.http.get((this.baseUrl + url), httpOptions)
    }
  }

  showSuccess(msg) {
    this.toastr.success(msg);
  }
  showError(msg) {
    this.toastr.error(msg)
  }
  showBug(msg)
  {
    this.toastr.info(msg)
  }

}
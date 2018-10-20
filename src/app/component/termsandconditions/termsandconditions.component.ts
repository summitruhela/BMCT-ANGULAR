import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-termsandconditions',
  templateUrl: './termsandconditions.component.html',
  styleUrls: ['./termsandconditions.component.css']
})
export class TermsandconditionsComponent implements OnInit {

  terms:any = '';
  constructor(private service: ServiceService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.service.showSpinner()
    console.log(this.service.baseUrl)
    this.getTerms();
  }

  getTerms(){
    this.service.getApi("termAndCondition",0).subscribe(response => {
      this.service.hideSpinner()
      console.log(`PTerm and condition is ${JSON.stringify(response)}`)
      if(response['responseCode']==200){
        this.terms = this.sanitizer.bypassSecurityTrustHtml(response['result'].about);
      }else{
        console.log(response['responseMessage'])
      }
    },
    error => {
      this.service.hideSpinner()
      console.log('Error in getting privacy policy.')
    })
  }

}

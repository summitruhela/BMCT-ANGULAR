import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  privacy:any = '';
  constructor(private service: ServiceService, private sanitizer: DomSanitizer) { }

  async ngOnInit() {
    this.service.showSpinner()
    this.getPrivacyPolicy();
  }

  getPrivacyPolicy(){
    this.service.getApi("privacyAndPolicy",0).subscribe(response => {
      this.service.hideSpinner()
      console.log(`Privacy policy is ${JSON.stringify(response)}`)
      if(response['responseCode']==200){
        this.privacy = this.sanitizer.bypassSecurityTrustHtml(response['result'][0].policy);
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

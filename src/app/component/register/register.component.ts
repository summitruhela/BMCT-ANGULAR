import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Slider } from 'ngx-slider';
import { ServiceService } from '../../services/service.service';
import { SocketService } from '../../socket.service';
import { IImage } from 'ng-simple-slideshow/src/app/modules/slideshow/IImage';

declare var $:any
// declare var google,$,my;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  codeArray: any = [];
  public slider = new Slider();

  // public sliderNew = new Slider()
  lat:any;
  long:any;
  imageUrl:any=''
  image:any
  addr: any;
  addrKeys
  imageUrls: (string | IImage)[] = [ ];
  srcnew: any=[];
  sliderAyy: any = []
  setAddress(addrObj) {  
    console.log('ADDRESS OBJECT--->', addrObj)
    var self;
    this.zone.run(() => {
      console.log('zome ruen')
      this.addr = addrObj;
      console.log('bs apn akam kro focus s  => ' , this.addr)
      this.addrKeys = Object.keys(addrObj);
    });
  }
  constructor(private fb: FormBuilder, private service: ServiceService, private zone: NgZone, private socket: SocketService) { 
    this.service.showSpinner()
    this.slider.config.loop = true;
    this.slider.config.showPreview = false;
    this.slider.config.showDots = false
    this.slider.config.transitionDuration = 1;
    this.registrationForm = this.fb.group({
      "fName": ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]*$/), Validators.minLength(2) ])],
      "lName": ['', Validators.compose([ Validators.minLength(2), Validators.pattern(/^[a-zA-Z ]*$/) ])],
      "email_ID": ['', Validators.compose([Validators.required, Validators.pattern(/^[A-Z0-9_-]+([\.][A-Z0-9_]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,3})+$/i)])],
      "password": ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/^[a-zA-Z\d$@$!%*#?&^\S]*$/)])],
      "phoneNumber": ['', Validators.compose([Validators.required, Validators.pattern(/^[1-9][0-9]{6,13}$/)]) ],
      // "address": ['', Validators.required],
      "merchantWebsite": ['', Validators.pattern(/^(www|http:|https:)+[^\s]+[\w]/i)],
      "accept": ['',Validators.required],
      "country":[''],
      "state":[''],
      "city":[''],
      "pin":[''],
      "addLine1":[''],
      "prefix":['',Validators.required],
      "compName": ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9& ]*$/), Validators.minLength(2) ])],
      "regNumber": ['', Validators.compose([ Validators.minLength(2), Validators.pattern(/^[0-9-:.]*$/) ])]
     
    });
     this.getBanners(); 
   
  }

  async ngOnInit() {
   
    this.getCountryCodesList();
    
  }

  getCountryCodesList(){
    this.service.getCountryCodeJson().subscribe(response => {
      this.codeArray = response['countries'];
    },
    error => {
      console.log(`Error is ${JSON.stringify(error)}`)
    })
  }

  getBanners(){
      this.service.getApi('banner',0).subscribe(response => {    
        this.service.hideSpinner()   
        console.log('WERTYUJHYGTRJKJH', response['result']) 
        if(response['responseCode']==200){
          //  this.sliderAyy= response['result']
          for(let i=0;i<response['result'].length;i++){
            console.log(`Banner response ${JSON.stringify(response['result'][i])}`)
            this.imageUrls.push({ url: response['result'][i].banners, caption: response['result'][i].text})                  
          }
          console.log(`Banner data is ${JSON.stringify(this.slider)}`)
        }else{
          console.log(`Response of banner is ${response['responseMessage']}`)
        }
      },
      error => {
        this.service.hideSpinner()  
        console.log(`Error is ${JSON.stringify(error)}`)
      })
  }

  doRegister(){
    this.service.showSpinner()
    console.log(this.registrationForm.value)
    //this.registrationForm.reset();
    let obj ={    
      "fName":this.registrationForm.value.fName,
      "lName":this.registrationForm.value.lName,
      "email": this.registrationForm.value.email_ID,
      "password":this.registrationForm.value.password,
      "phoneNumber":this.registrationForm.value.phoneNumber,
      "location":{
      "place": $('#location').val(),
      "country": this.addr['country'],
      "state": this.addr['admin_area_l1'],
      "addLine1": this.addr['route'],
      "coordinates": [this.addr['lng'], this.addr['lat']] ,
      "zipCode":this.addr['postal_code']
      },
      "logo":this.imageUrl,
      "merchantWebsite":this.registrationForm.value.merchantWebsite,
      "companyName":this.registrationForm.value.compName,
      "registrationNumber":this.registrationForm.value.regNumber
    }
    console.log(`Register form value ${JSON.stringify(obj)}`)
    
    this.service.showSpinner();
    this.service.postApi("registration", obj, 0).subscribe(response => {
      this.service.hideSpinner();
      if(response['responseCode']==200){
        $("#location").val(" ");
        this.imageUrl=''
        this.service.toastSucc(response['responseMessage'])
        this.registrationForm.reset();
      } else if(response['responseCode'] == 409){
        this.service.toastErr('This Email ID already exists')
      }
      else{
        this.service.toastErr(response['responseMessage'])
      }
    },
    error => {
      this.service.hideSpinner();
      this.service.toastErr('Something went wrong.')
    })
  }
  getLocation(){
    console.log('get location clicked => ' , this.addr)
    this.registrationForm.patchValue({
          state:this.addr['admin_area_l1'],
          country:this.addr['country'],
          addLine1:this.addr['route'],
          pin: this.addr['postal_code']
    })
    console.log(this.registrationForm.value)
  }

  fileSelect(event){
    var self = this;
		if(event.target.files && event.target.files[0] ){
			var fileType=event.target.files[0].type			
			if(fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg'){				
				this.image = event.target.files[0]		
				var reader = new FileReader()
				reader.onload = (e) =>  {
                self.imageUrl = e.target['result']
                this.image =e.target['result']       
			    }
			    reader.readAsDataURL(event.target.files[0])			}
			else {		     
                self.imageUrl= '';
                this.service.toastErr('Please select image file only !')						
			   }			
		}
  }

}

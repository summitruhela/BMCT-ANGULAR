import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ProviderService } from '../../Services/provider.service';
import { Router } from '@angular/router';
import { SocketService } from '../../Services/socket.service';
declare var $:any
@Component({
  selector: 'app-merchant-form',
  templateUrl: './merchant-form.component.html',
  styleUrls: ['./merchant-form.component.css']
})
export class MerchantFormComponent implements OnInit {profile:any
  merchantForm:FormGroup
  imageUrl=''
  image:any;
  codeArray: any = [];
  public title = 'Places';
  public addrKeys: string[];
  public addr: object;
  lat:any
  lng:any
  statesArr: any = [];
  place: any;
  state: any;
  country: any;
  addLine1: any;
  coordinates: any[];
  zipCode: any;
  setAddress(addrObj) {  
    console.log('ADDRESS OBJECT--->', addrObj)
    this.zone.run(() => {      
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
    });
  }
    constructor(private service:ProviderService, private router:Router, private zone: NgZone, private scoket:SocketService) {
      if(this.service.pageIs=='addMerchant'){
        this.merchantForm = new FormGroup({
          fname: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z]{2,20}$/)]),
          lname: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z ]{2,20}$/)]),
          email: new FormControl('',[Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,3})$/)]),
          password: new FormControl('',[Validators.required, Validators.minLength(8)]),
          prefix: new FormControl('',[Validators.required]),
          phoneNum: new FormControl('',[Validators.required, Validators.minLength(7), Validators.pattern(/^[1-9][0-9][0-9]{4,12}$/) ]),
          country: new FormControl('',),
          address: new FormControl(''),
          state: new FormControl(''),
          addLine1: new FormControl(''),    
          website: new FormControl('',[Validators.pattern(/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i)]),
          pin :  new FormControl(''),
          compName: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z0-9& ]*$/), Validators.minLength(2) ]), //['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9& ]*$/), Validators.minLength(2) ])],
      regNumber: new FormControl('',[ Validators.minLength(2), Validators.pattern(/^[0-9-:.]*$/) ])//['', Validators.compose([ Validators.minLength(2), Validators.pattern(/^[0-9-:.]*$/) ])]
        })
      } else {
        this.merchantForm = new FormGroup({
          fname: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z]{2,100}$/)]),
          lname: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z ]{2,100}$/)]),
          email: new FormControl('',[Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,3})$/)]),
          // password: new FormControl('',[Validators.required, Validators.minLength(8)]),
          prefix: new FormControl('',[Validators.required]),
          phoneNum: new FormControl('',[Validators.required, Validators.minLength(7), Validators.pattern(/^[1-9][0-9][0-9]{4,12}$/) ]),
          country: new FormControl('',),
          address: new FormControl(''),
          state: new FormControl(''),
          addLine1: new FormControl(''),    
          website: new FormControl('',[Validators.pattern(/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i)]),
          pin :  new FormControl(''),
          compName: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z0-9& ]*$/), Validators.minLength(2) ]), //['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9& ]*$/), Validators.minLength(2) ])],
          regNumber: new FormControl('',[ Validators.minLength(2), Validators.pattern(/^[0-9-:.]*$/) ])//['', Validators.compose([ Validators.minLength(2), Validators.pattern(/^[0-9-:.]*$/) ])]
        })
      }
      
      $("#fname, #lname").on("keypress", function(e) {
        if (e.which === 32 && !this.value.length)
          e.preventDefault();
      });
      $('#email, #password, #phoneNum, #pin, #website').on('keypress', function(e) {
        if (e.which == 32)
          return false;
      });
     }
  
    ngOnInit() {      
      if(localStorage.merchantId){
        this.service.spinnerShow()
        this.viewMerchant()
      }
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
      
    viewMerchant(){
      let view={
        "merchant_id":localStorage.merchantId
      }
      this.service.callPost('merchantProfile', view).subscribe(response => {
        this.service.spinnerHide()     
          if(response['responseCode'] == 200){   
            this.profile = response['result']  
            console.log('profile== >.' + JSON.stringify(this.profile)) 
          this.merchantForm.patchValue({
            fname: this.profile.fName,
            lname: this.profile.lName,
            email: this.profile.email_ID,
            prefix: this.profile.countryCode,
            phoneNum:this.profile.phoneNumber,
            address: this.profile.location.place,
            password:this.profile.password,
            website:this.profile.merchantWebsite,
            state:this.profile.location.state,
            country:this.profile.location.country,
            addLine1:this.profile.location.addLine1,           
            pin: this.profile.location.zipCode,
            compName : this.profile.companyName ,
            regNumber:this.profile.registrationNumber      
          })
          this.imageUrl= this.profile.logo                         
            console.log('PROFILE IS--->>>', this.profile) 
          } else if(response['responseCode'] == 403){
            localStorage.removeItem('token')
            this.router.navigate(['/login'])
            this.service.error('Your token is expired!')
           } else if(response['responseCode']== 404){
            console.log(response['responseMessage'])
           }
           else {
            this.service.error(response['responseMessage']);  
           }
      }, error =>{
        this.service.spinnerHide()
        this.service.error('Something went wrong!')
      })
    }

        save(){           
          this.service.spinnerShow()
          this.service.clear()
          if(this.service.pageIs=='addMerchant'){            
            let profileDetails={            
                     fName: this.merchantForm.value.fname,
                     lName: this.merchantForm.value.lname,
                     email_ID: this.merchantForm.value.email,
                     countryCode: this.merchantForm.value.prefix,
                     phoneNumber: this.merchantForm.value.phoneNum,
                     password: this.merchantForm.value.password,
                     location: { place: $('#location').val(),
                     state: this.addr['admin_area_l1'],
                     country: this.addr['country'],
                     addLine1: this.addr['route'],
                     coordinates: [this.addr['lng'], this.addr['lat']],
                     zipCode:this.addr['postal_code']
                             },           
                     merchantWebsite: this.merchantForm.value.website,
                     logo:this.imageUrl,
                     registrationNumber: this.merchantForm.value.regNumber,
                     companyName : this.merchantForm.value.compName
                 }
                 console.log('TO SEND-->', profileDetails)
                this.service.callPost('addMerchantAdmin', profileDetails).subscribe(response => {
                  this.merchantForm.reset()
                   if(response['responseCode'] == 200){  
                     this.service.success('Merchant successfully added') 
                     this.scoket.refreshMessage('refreshed List')                              
                    this.router.navigate(['/merchant-management'])        
                    
                   } else if(response['responseCode'] == 403){
                    localStorage.removeItem('token')
                    this.router.navigate(['/login'])
                    this.service.error('Your token is expired!')
                   } else if(response['responseCode'] == 409){
                    this.service.error(response['responseMessage'])
                   } else if(response['responseCode'] == 404){
                    this.service.error('This Email ID already exists')
                   }
                   else {
                    this.service.error(response['responseMessage'])
                   }
                   this.service.spinnerHide()    
                }, error =>{
                  this.merchantForm.reset()
                  this.service.spinnerHide()
                  this.service.error('Something went wrong')
                })
          }
          else{        
          if(this.addr != undefined) {
            this.place = $('#location').val(),
            this.state = this.addr['admin_area_l1'],
            this.country = this.addr['country'],
            this.addLine1 = this.addr['route'],
            this.coordinates = [this.addr['lat'], this.addr['lng']],
            this.zipCode = this.addr['postal_code'] 
          } else {
            this.place = this.profile.location.place,
            this.state = this.profile.location.state,
            this.country = this.profile.location.country,
            this.addLine1 = this.profile.location.addLine1,
            this.coordinates = this.profile.location.coordinates[0],this.profile.location.coordinates[1]
            this.zipCode = this.profile.location.zipCode
          }   
          let profileDetails={
           merchant_id: localStorage.merchantId, 
                   fName: this.merchantForm.value.fname,
                   lName: this.merchantForm.value.lname,
                   email_ID: this.merchantForm.value.email,
                   countryCode: this.merchantForm.value.prefix,
                   phoneNumber: this.merchantForm.value.phoneNum,
                   password: this.merchantForm.value.password,
                   location: { place: this.place,
                               state: this.state,
                               country: this.country,
                               addLine1: this.addLine1,
                               coordinates: this.coordinates,
                               zipCode: this.zipCode
                           },           
                   merchantWebsite: this.merchantForm.value.website,
                   logo:this.imageUrl,
                   registrationNumber: this.merchantForm.value.regNumber,
                     companyName : this.merchantForm.value.compName
               }
               console.log('TO SEND-->', profileDetails)
              this.service.callPost('editMerchant', profileDetails).subscribe(response => {
                 
                 if(response['responseCode'] == 200){  
                  this.service.success('Merchant successfully edited')    
                  this.router.navigate(['/merchant-management'])        
                  
                 } else if(response['responseCode'] == 403){
                  localStorage.removeItem('token')
                  this.router.navigate(['/login'])
                  this.service.error('Your token is expired!')
                 } else if(response['responseCode']== 404){
                  console.log(response['responseMessage'])
                 }
                 else {
                  this.service.error(response['responseMessage']);  
                 }
                 this.service.spinnerHide()    
              }, error =>{
                this.service.spinnerHide()
                this.service.error('Something went wrong!')
              })
          }
          
                    
        }
        back(){
          this.router.navigate(['/merchant-management'])
        }
  
  
        fileSelect(event){
          var self = this;
          if(event.target.files && event.target.files[0] ){
            var fileType=event.target.files[0].type			
            if(fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg' || fileType === 'image/ico'){				
              this.image = event.target.files[0]		
              var reader = new FileReader()
              reader.onload = (e) =>  {
                      self.imageUrl = e.target['result']
                      this.image =e.target['result']  
                      console.log('IMAGE--->',this.image)
            console.log('IMAGE URL--->',this.imageUrl)     
                }
                reader.readAsDataURL(event.target.files[0])	            
          }
            else {		     
              // this.image = ''				
              //this.imageUrl = '';
                      self.imageUrl= '';
                      // this.imageUrl='assets/img/profile-img.jpg'	
                      this.service.error('Please select image file only !')						
                }			
          }
        }

        getLocation(){
         
          console.log(this.addr)          
           console.log('country',this.addr['country'])
          console.log('locality',this.addr['route'])
          console.log('state',this.addr['admin_area_l1'])
          console.log('city',this.addr['locality'])
          console.log('pin',this.addr['postal_code']) 
          this.merchantForm.patchValue({
            state:this.addr['admin_area_l1'],
            country:this.addr['country'],
            addLine1:this.addr['route'],
            pin: this.addr['postal_code']

          })
        }
        onSelectCountry() {
          console.log('selected country => ' + this.merchantForm.controls['country'].value)
          let selectedCountry = this.merchantForm.controls['country'].value
          this.statesArr = selectedCountry ?  this.codeArray.filter(x => x.country == selectedCountry)[0].states : []
          console.log('selected country => ' , this.merchantForm.value)
          
        }
        /* save1() {
          this.scoket.refreshMessage('gauri + brahmin')
        } */
}

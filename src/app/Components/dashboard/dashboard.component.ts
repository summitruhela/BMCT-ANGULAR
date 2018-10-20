import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../Services/provider.service';
import { SocketService } from '../../Services/socket.service';

declare var google:any
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  markerArr: any = [];
  constructor(private service: ProviderService, private scoket:SocketService) { 
    this.scoket.getMessages().subscribe((message: any) => {
      console.log(`Respone of socket is ${JSON.stringify(message)}`)
      this.locations = message['result']
      console.log("CONSTRUCTOR")
      setTimeout(() => {
        // this.initialize1()
        this.addMarker()
      }, 1000);
     }) 
  }
  map;

locations:any=[]
  ngOnInit() {
    
    console.log('ng on init')
    setTimeout(() => {
      this.initialize1()
    }, 300)
    
    // this.scoket.getMessages().subscribe((message: any) => {
    //   console.log(`Respone of socket is ${JSON.stringify(message)}`)
    //   this.locations = message['result']
    //   console.log("ONINIT")
    //   this.initialize1()
    // })
    // this.scoket.sendMessage('users list')

    this.scoket.sendMessage("USER INFO");
    // this.scoket.getMerchantList().subscribe((message:any)=>{
    //   console.log("list is ", message)
    // })
    // this.mapList()
    // this.initialize();
    // this.initialize1()
  }
// mapList(){
//   this.service.callGet('userInfo').subscribe(response => {
//     this.service.spinnerHide()   
//      if(response['responseCode'] == 200){
//       console.log('API MSG CODE 200')
//       console.log(response)
//      } 
//      else {
//        console.log("API MSG CODE",response['responseCode'] )
//      }
//   }, error =>{
//     this.service.spinnerHide()
//     console.log('API ERROR')
//     this.service.error('ERROR')
//   })
// }

 /* async initialize() 
{ 
    console.log('map called')
    var mapOptions = {
    center: new google.maps.LatLng('23.11', '71.00'),
    zoom: 2,
    scrollwheel: false,
    disableDefaultUI: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
 };

  this.map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
   this.addMarker()
  
 } */

 addMarker()
  {
    this.markerArr.forEach(marker => {
      marker.setMap(null)
    });
    this.markerArr = []
    var infowindow = new google.maps.InfoWindow();
    
    var marker, i;
    if(this.locations.length != 0) {
      for (i = 0; i < this.locations.length; i++) {
        // console.log("LOCATION==>>", this.locations[i])
        
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(this.locations[i].location.coordinates[1], this.locations[i].location.coordinates[0]),
          map: this.map
        });
        this.markerArr.push(marker)
      // let self = this;
      // google.maps.event.addListener(marker, 'click', (function(marker, i) {
      //   return function() {
      //     // console.log('LOCATION-->', self.locations)
      //     infowindow.setContent(self.locations[i].email);
      //     infowindow.open(this.map, marker);
      //   }
      // })(marker, i));
      }
    }
  }
  initialize1(){ 
    console.log(this.locations)
    this.map = new google.maps.Map(document.getElementById('map_canvas'), {
      zoom: 2,
      center: new google.maps.LatLng(23.11, 71.00),
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.addMarker()
  }

}

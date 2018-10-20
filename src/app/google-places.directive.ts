import { Directive, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
// declare function require(path: string): any;
// var google = require('@types/googlemaps');
// declare const google: any;
// const google = require('@types/googlemaps');

@Directive({
  selector: '[google-place]'
})
export class GooglePlacesDirective implements OnInit{
  latng:any={}
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
private element: HTMLInputElement
  constructor(private elRef: ElementRef) { 
    this.element = elRef.nativeElement
  }
  getFormattedAddress(place,lat,lng) {
    //@params: place - Google Autocomplete place object
    //@returns: location_obj - An address object in human readable format
    let location_obj = {};
    for (let i in place.address_components) {
      let item = place.address_components[i];
      location_obj['lat']= lat;
      location_obj['lng'] =lng
      location_obj['formatted_address'] = place.formatted_address;
      if(item['types'].indexOf("locality") > -1) {
        location_obj['locality'] = item['long_name']
      } else if (item['types'].indexOf("administrative_area_level_1") > -1) {
        location_obj['admin_area_l1'] = item['short_name']
      } else if (item['types'].indexOf("street_number") > -1) {
        location_obj['street_number'] = item['short_name']
      } else if (item['types'].indexOf("route") > -1) {
        location_obj['route'] = item['long_name']
      } else if (item['types'].indexOf("country") > -1) {
        location_obj['country'] = item['long_name']
      } else if (item['types'].indexOf("postal_code") > -1) {
        location_obj['postal_code'] = item['short_name'] 
      }
     
    }
    return location_obj;
  }

  ngOnInit(){
    const autocomplete = new google.maps.places.Autocomplete(this.element);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      //Emit the new address object for the updated place
      console.log("latitude is "+autocomplete.getPlace().geometry.location.lat()) 
       this.latng = {
         place: autocomplete.getPlace(),
         lat : autocomplete.getPlace().geometry.location.lat(),
         lng : autocomplete.getPlace().geometry.location.lng()
       }
      this.onSelect.emit(this.getFormattedAddress(autocomplete.getPlace(),autocomplete.getPlace().geometry.location.lat(),autocomplete.getPlace().geometry.location.lng()));
    });
  }
 

}

import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public router:Router) {
    
    this.router.events.subscribe(x => {   
      if(x instanceof NavigationEnd) {       
        window.scroll(0,0)
        let currUrl = this.router.url.indexOf('?') == -1 ? this.router.url.split('/')[1] : this.router.url.slice(1,this.router.url.indexOf('?'))
        console.log(this.router.url)  
        if (x instanceof NavigationEnd) {
          window.scroll(0, 0)
          let currUrl = this.router.url.indexOf('?') == -1 ? this.router.url.split('/')[1] : this.router.url.slice(1, this.router.url.indexOf('?'))
  
          if (localStorage.getItem('token') === null) {
            if (localStorage.getItem('email') === null) {
              this.router.navigate(['/login']);
            }
            else{
              this.router.navigate(['/enterPassword']);
            }
          }
          else if (!(localStorage.getItem('token') === null)) {
            if (currUrl === 'enterPassword' || currUrl === 'login') {
              this.router.navigate(['/business_details'])
            }
          }
        }
      }
   });
    console.log('this.router.url', this.router.url)
   }
}

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
          if(localStorage.getItem('token') === null){
            console.log(this.router.url)         
            
                /* if(!(this.router.url === '/login' || this.router.url === '/forgot-password' || this.router.url.substring(this.router.url.lastIndexOf("4200/") + 4,this.router.url.lastIndexOf("/?token")) === '/reset-password')){
                  this.router.navigate(['/login']);
                }   */
                if(!(currUrl === 'login' || currUrl === 'forgot-password' || currUrl === 'reset-password')){
                  this.router.navigate(['/login']);
                }  
              } else {
                /* if(this.router.url === '/login' || this.router.url === '/forgot-password' || this.router.url.substring(this.router.url.lastIndexOf("4200/") + 4,this.router.url.lastIndexOf("/?token")) === '/reset-password'){
                  this.router.navigate(['/dashboard'])
                } */
                if(currUrl === 'login' || currUrl === 'forgot-password' || currUrl === 'reset-password'){
                  this.router.navigate(['/dashboard'])
                }
              }
      }
   });
    console.log('this.router.url', this.router.url)
   }
}

import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
// private url = 'http://172.16.16.220:1419';
private url = 'http://ec2-52-76-162-65.ap-southeast-1.compute.amazonaws.com:1419'
private socket;
  constructor() {
    this.socket = io(this.url)
    console.log('socket instance-->', this.socket)
    this.socket.emit('connect_error-->', function(data){
      console.log('connection error-->', data);
    })
   }

   public refreshMessage(message){
    console.log('emit')
    this.socket.emit('refreshedList', message)
  }
  public getRefresh = () =>    {
      return Observable.create((observer) => {
        this.socket.on('refreshedList', (message) => {
          observer.next(message);
        });
      });
    }
}

import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
// import { Base64 } from 'js-base64';
// import * as rncryptor from 'jscryptor';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
    //  private url = 'http://172.16.16.220:1419';
  // private url= 'http://172.16.6.178:8088';
     private url = 'http://ec2-52-76-162-65.ap-southeast-1.compute.amazonaws.com:1419'
    private socket; 
  constructor() { 
    this.socket = io(this.url,{query:'token=AwGVsWriItQ+IwDJZTk0fajLVqsQknZgmLxRaY2qJNd/hwb/1fIW2K37w40zoWQJYOIeW92eAx91tFy0LrC40xLTFmEZSphEQ6+OcziBrydEX8EQ/vHHEow4Xk4aI9EBFRcbervIRREfwHyNaTMKkxqi4Krc9ebrM51KH/i/U857Ry/hj2Z3LO0FDzE4Hu8bZAKbfh5hQiEgcXyxocfnPbbwRfvxFoIrzxCKY+nQ6jh6V0WD5DdFNL8qWuV0hTMW6X9i4OZIa8fAd+uzDyLk+YDw'});
    // let password ="base64:OrC1q3MNTUtKJpFaHMBmU036W+x3o+/DvPdXZt9lOVY="
    // var decoded = Base64.decode('ODIgYnl0ZXM6ODIgYnl0ZXM=')
    // var res = decoded.split(":");
    // let finalResult1 = rncryptor.Decrypt(res[0].toString(), password);
    // let finalResult12 = rncryptor.Decrypt(res[1].toString(), password);
    // console.log(`result1 is ${finalResult1}   and result2 is   ${finalResult12}`)
    console.log("socket instance is ",this.socket)
    this.socket.on('connect_error', function (data) {
      console.log('connection_error',data);
    });
  }

  public sendMessage(message) {
    this.socket.emit('userInfo', message);
    console.log('sendMessage USERINFO-->>>>', message)
  }
  public getMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('userInfo', (message) => {
         
            observer.next(message);
            console.log('getMessages USERINFO-->>>>', message)
        });
    });
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
  // public getMerchantList = () => {
  //   return Observable.create((observer) => {
  //       this.socket.on('merchantList', (message) => {
  //           observer.next(message);
  //       });
  //   });
  // }


}

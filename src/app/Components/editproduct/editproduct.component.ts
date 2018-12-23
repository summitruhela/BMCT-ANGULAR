import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/provider.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  productDetail: any
  ckeditorContent: any;
  constructor(public service: DataService) {
    
   }

  ngOnInit() {
    this.getProductDetail()
    console.log("this.productDetail.product.description",this.productDetail.product.description)
    this.ckeditorContent=this.productDetail.product.description
  }


  //!api called
  getProductDetail() {
    this.service.getApi('vendor/productDetails?_id=5bfbeb833605496d97427ccd&lang=en', 0).subscribe(response => {

      if (response['statusCode'] == 200) {
        this.service.showSuccess("get Product Detail")
        this.productDetail = response['result']
        console.log("response", this.productDetail.product.image[0])

      }
      else {
        console.log(response['result'])
        this.service.showError('Something Went to Wrong')
        // this.service.showError('Invalid email or password.')
      }
    }, error => {
      console.log('error occur', error)
      this.service.showError('Server Error')
    })
  }
}

import { Component, OnInit, ChangeDetectorRef, ViewContainerRef, ViewChild, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { ImageUploaderOptions, FileQueueObject } from 'ngx-image-uploader';
import { DataService } from 'src/app/Services/provider.service';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ChildComponent } from '../child/child.component';
import { async } from 'q';
// import { ChildComponent } from './../'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  @ViewChild('viewContainerRef', { read: ViewContainerRef })

  combinationOfVariants: any
  goo = false
  VCR: ViewContainerRef;
  index: number = 0;
  componentsReferences = [];
  addProductForm: FormGroup
  Title: any;
  itemsAsObjects: any;
  // itemsAsObjectss: any;
  ckeditorContent: any;
  SellingPrice: any;
  imageOptions: ImageUploaderOptions = {
    thumbnailHeight: 200,
    thumbnailWidth: 200,
    uploadUrl: 'http://some-server.com/upload',
    allowedImageTypes: ['image/png', 'image/jpeg'],
    maxImageSize: 3
  };
  responseData: ArrayBuffer;
  category: any;
  formgroup: any;
  postSubCatory: {};
  getSubCatorydata: any;
  getBrandList: any;
  image: any;
  imageUrl: any;
  tagChips: any = [];
  productCategoryname: any;
  productCategoryId: any;
  subCategoryID: any;
  BrandId: any;
  self: any;
  public imageData: String;
  optionValue: any;
  addNewBrand: any;
  myForm: FormGroup;
  temp: any = []
  dataLoop: any[];
  myGroup: any;
imageArray:[String]
  url: string | ArrayBuffer;

  onUpload(file: FileQueueObject) {
    console.log("image upload", file.response);
  }
  constructor(private _fb: FormBuilder, private formBuilder: FormBuilder, public service: DataService, private CFR: ComponentFactoryResolver) {
    this.formgroup = formBuilder.group({
      brand: ['', Validators.required]
    });
    //   this.myGroup = new FormGroup({
    //     title: new FormControl()
    //  });
    this.myGroup = formBuilder.group({
      title: [''],
      description: [''],
      image1: [''],
      image2: [''],
      image3: [''],
      image4: [''],
      image5: [''],
      image6: [''],
      image7: [''],
      image8: [''],
      productcategory:[''],
      productsubcategory:[''],
      producttype:[''],
      productbrand:[''],
      addBrand:[''],
      searchtag:[''],
      combinationOfVariants:[''],
      sellingprice:[''],
      costprice:[''],
      itemweight:[''],
      InventorySKU:[''],
      quantity:[''],
      trialPack:['']
    });
  }
  // [[red,blue,green],[xxl,xl,L],[Silk,cotton]]
  ngOnInit() {

    // console.log(JSON.stringify(this.dataLoop))
    this.myForm = this._fb.group({
      // front: ['',],
      languages: this._fb.array([
        this.initlanguage(),
      ])
    });
    this.getCategoryList();
    this.service.optionObs.subscribe((response: any) => {
      console.log('response => ', response)
      this.getCombination(response)
    })
  }

  initlanguage() {
    console.log("$$$$$$4", this.myForm)
    return this._fb.group({
      React: [''],
      Angular: ['']
    });
  }


  addLanguage() {
    console.log('--->>check', this.myForm.value)
    // console.log('------>>>', this.myForm.value)
    const control = <FormArray>this.myForm.controls['languages'];
    // console.log('-==-=-=-=-=>>>', control)
    control.push(this.initlanguage());
    // this.saveVariants(this.myForm)
  }


  removeLanguage(i: number) {
    const control = <FormArray>this.myForm.controls['languages'];
    control.removeAt(i);
  }


  //!
  saveVariants(val) {
    var color = Array
    var i
    var temp = []
    // console.log("#############",val)

    console.log("=======>>", val.value.languages)
    var lang = val.value.languages
    var outerArr = []
    for (let index = 0; index < lang.length; index++) {
      var angData = lang[index].Angular;
      var innarr = []
      for (let index2 = 0; index2 < angData.length; index2++) {
        innarr.push(angData[index2].value);

      }
      console.log("Inner", innarr)
      outerArr.push(innarr)

    }
    console.log("outerArr", outerArr)

    this.dataLoop = this.cartesian(outerArr);
    console.log('##################33', this.dataLoop)

  }
  // cartesians(arg: any) {
  //   // !this.cartesian([[0,1], [0,1,2,3]]); 
  //   //!
  //   var r = [], /* arg = arguments, */ max = arg.length - 1;
  //   console.log("length", max)
  //   function helper(arr, i) {
  //     arg.forEach(element => {
  //       // console.log("DODODODODODO",element)
  //       for (var j = 0, l = element.Angular.length; j < l; j++) {
  //         var a = element.Angular.slice(0); // clone arr
  //         // console.log('a value--', a, i)
  //         console.log('Y^^^^^^6666', arg, i, j)

  //         a.push(arg.Angular[i][j]);
  //         if (i == max)
  //           r.push(a);
  //         else
  //           helper(a, i + 1);
  //       }
  //     })
  //   }
  //   helper([], 0);
  //   console.log('combination--->>', r)
  //   return r;
  // }

  cartesian(arg: any) {
    // !this.cartesian([[0,1], [0,1,2,3]]);
    // [["red", "blue", "green"], ["xxl", "xl", "L"], ["Silk", "cotton"]]
    var r = [], /* arg = arguments, */ max = arg.length - 1;
    function helper(arr, i) {
      for (var j = 0, l = arg[i].length; j < l; j++) {
        // console.log('before slice', arr)
        var a = arr.slice(0); // clone arr
        // console.log('slicedata', a, i)
        console.log(arg, 'Y^^^^^^6666', arg[i][j], i, j, max)
        a.push(arg[i][j]);
        if (i == max) {

          r.push(a);
          console.log('R VALUE', r)

        }
        else
          helper(a, i + 1);
      }
    }
    helper([], 0);
    // console.log('combination--->>',r)
    return r;
  }
  // //!create Components
  // createComponent() {

  //   let componentFactory = this.CFR.resolveComponentFactory(ChildComponent);
  //   let componentRef: ComponentRef<ChildComponent> = this.VCR.createComponent(componentFactory);
  //   let currentComponent = componentRef.instance;

  //   currentComponent.selfRef = currentComponent;
  //   currentComponent.index = ++this.index;

  //   // prividing parent Component reference to get access to parent class methods
  //   currentComponent.compInteraction = this;

  //   // add reference for newly created component
  //   this.componentsReferences.push(componentRef);
  // }

  //!remove
  // remove(index: number) {

  //   if (this.VCR.length < 1)
  //     return;

  //   let componentRef = this.componentsReferences.filter(x => x.instance.index == index)[0];
  //   let component: ChildComponent = <ChildComponent>componentRef.instance;

  //   let vcrIndex: number = this.VCR.indexOf(componentRef)

  //   // removing component from container
  //   this.VCR.remove(vcrIndex);
  //   this.componentsReferences = this.componentsReferences.filter(x => x.instance.index !== index);
  // }
  //!getCategory
  getCatgory(categoryId) {
    console.log("Event-->", categoryId);
    this.getSubCatoryList(categoryId)
    this.getBrandListdata()
  }
  SubCatorydata(subcategoryId) {
    console.log("Event------------>", subcategoryId);
    this.subCategoryID = subcategoryId
    this.getProductName(subcategoryId)
    // console.log("data is binding-------->",this.itemsAsObjects)
  }
  getBrandId(event) {
    console.log("*&^#$%^765434567876543456765434567654", event)
    this.BrandId = event
  }
  //!getCategoryList
  getCategoryList() {
    this.service.getApi('vendor/getCategoryList', 0).subscribe(response => {

      if (response['statusCode'] == 200) {
        this.service.showError('found')
        this.category = response['result'];
        // console.log(this.category)

      }
      else {
        this.service.showError('Invalid Email')
        // this.service.showError('Invalid email or password.')
      }
    }, error => {
      console.log('error occur', error)
      this.service.showError('Server Error')
    })
  }

  //!getsubCatoryList
  getSubCatoryList(categoryId) {
    console.log("function called")
    this.postSubCatory = {
      categoryModel: categoryId,
      lang: "en"
    }
    this.service.postApi('vendor/getSubCategory', this.postSubCatory, 0).subscribe(response => {

      if (response['statusCode'] == 200) {
        this.service.showSuccess('data is find')
        this.getSubCatorydata = response['result']

      }
      else {
        this.service.showError('Invalid Email')
        // this.service.showError('Invalid email or password.')
      }
    }, error => {
      console.log('error occur', error)
      this.service.showError('Server Error')
    })

  }

  //!getproduct
  getProductName(subCatId) {
    console.log("getProductlist enter", subCatId)

    let temp = {
      subCategoryId: subCatId
    }
    this.service.postApi('vendor/getProductCategoryName', temp, 0).subscribe(response => {

      if (response['statusCode'] == 200) {
        this.service.showSuccess('get Product List')
        console.log("getProductlist", response)
        this.productCategoryname = response['result'];
      }
      else {
        this.service.showError('error')
      }
    }, error => {
      console.log('error occur', error)
      this.service.showError('Server Error')
    })
  }
  //!getBrandList
  getBrandListdata() {
    console.log("function called")
    this.service.getApi('vendor/getBrandList', 0).subscribe(response => {

      if (response['statusCode'] == 200) {
        this.service.showSuccess("get bandlist")
        console.log("asdfasdf", response)
        this.getBrandList = response['result']
      }
      else {
        this.service.showError('Invalid Email')
        // this.service.showError('Invalid email or password.')
      }
    }, error => {
      console.log('error occur', error)
      this.service.showError('Server Error')
    })
  }
  // !getProductCategoryId
  getProductCategoryId(_ID) {
    console.log("getProductlist enter", _ID)
    this.productCategoryId = _ID
  }
  //!addbrand 
  addBrand(data) {
    console.log("function valuevaluecalled", this.addNewBrand)
    let temp = {
      brandName: this.addNewBrand
    }

    this.service.postApi('vendor/addBrand', temp, 0).subscribe(response => {

      if (response['statusCode'] == 200) {
        this.service.showSuccess("BRAND ADDED")
        console.log("asdfasdf", response)
        this.getBrandListdata()
      }
      else {
        this.service.showError('Invalid Email')
        // this.service.showError('Invalid email or password.')
      }
    }, error => {
      console.log('error occur', error)
      this.service.showError('Server Error')
    })

  }

  onClickMe(data) {
    console.log("765432", data)
  }


  onFileChanged($event) : void {
    console.log($event)
    debugger
    this.readThis($event.target);
    this.readUrl($event.target);
  }
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      }
      
      console.log(this.image)
    myReader.readAsDataURL(file);
  }

  readUrl(inputValue:any) {
    if (inputValue.files && inputValue.files[0]) {
      var reader:FileReader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.url = reader.result;
      }
      // console.log(this.url)
      reader.readAsDataURL(inputValue.files[0]);
    }
  }
  //!image upload 
  // onFileChanged(event) {
  //   console.log("###33")
  //   var self = this;
  //   if (event.target.files && event.target.files[0]) {
  //     var fileType = event.target.files[0].type
  //     if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg') {
  //       this.image = event.target.files[0]
  //       var reader = new FileReader()
  //       reader.onload = (e) => {
  //         self.imageUrl = e.target['result']
  //       }
  //       this.imageData = self.imageUrl
  //       console.log("this is image--->>>>>>>>>",typeof this.imageData)
  //       // this.imageArray.push(this.imageData)
  //       reader.readAsDataURL(event.target.files[0])
  //       // debugger;
  //     }
  //     else {
  //       self.imageUrl = '';
  //       this.service.showError('Please select image file only !')
  //     }
  //   }
  // }

  //!getCombination
  getCombination(res) {
    // console.log('---------->>getCombination',localStorage.getItem('optionvalue'))
    // console.log('---------->>getCombination',localStorage.getItem('options'))
    // this.optionValue = localStorage.getItem('options').split(',')
    console.log('this => ', res.options, typeof res.options)

    this.optionValue = res.optionvalue
  }
  //!save Product
  saveProduct(val) {
    console.log("#########################33", this.myGroup,[this.imageData])
    debugger
    // console.log(this.itemsAsObjects);
    this.itemsAsObjects.forEach(element => {
      // console.log(element.value)
      this.tagChips.push(element.value)
    });
    // console.log("this is data of ck editor", this.ckeditorContent);
    // console.log(this.tagChips)
    let temp = {
      sellerId: "5bfbb9c3fd72a14b693fa9e7",
      productCategoryId: this.productCategoryId,
      subCategoryId: this.subCategoryID,
      brandId: this.BrandId,
      productName: this.Title,
      price: this.SellingPrice,
      // summary:"",
      description: this.ckeditorContent,
      // specifications:"",
      tag: this.tagChips,
      image: [this.imageData],
      lang: "en"
    }
    //!api called
    this.service.postApi('vendor/dont', temp, 0).subscribe(response => {

      if (response['statusCode'] == 200) {
        this.service.showSuccess("BRAND ADDED")
        console.log("asdfasdf", response)
        // this.getBrandListdata()
      }
      else {
        console.log(response['result'])
        this.service.showError('Invalid Email')
        // this.service.showError('Invalid email or password.')
      }
    }, error => {
      console.log('error occur', error)
      this.service.showError('Server Error')
    })
  }
}

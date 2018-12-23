import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/provider.service';
declare var $: any;

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.css']
})
export class BusinessDetailComponent implements OnInit {
  
    formgroup: any;
    businessName: any
    responseData: any;
    category: any;
    categoryList: any = [];
    dropdownSettings = {
        singleSelection: false,
        idField: '_id',
        textField: 'categoryName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 50,
        allowSearchFilter: true
    };
    dropdownList: any = [];
    sentData: {};
    options = [
        { "key": "google", "value": "Angular" },
        { "key": "facebook", "value": "React" },
        { "key": "evan", "value": "Vue" },
        { "key": "tilde", "value": "Ember" },
        { "key": "twitter", "value": "Bootstrap" }
    ]
    displayKey = "value";
    isDisable = false;
    styleGuide = {
        caretClass: 'caret',
        selectBoxClass: 'dropdown-wrapper',
        selectMenuClass: 'dropdown',
        optionsClass: 'option'
    };
    isDataList = false;
    searchKeys = ['key', 'value'];
    item: string[];
    constructor(private formBuilder: FormBuilder, public route: Router, public service: DataService) {
        this.item = ['Pizza', 'Pasta', 'Parmesan'];
        this.formgroup = formBuilder.group({
            business: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.pattern(/^[A-Z0-9_-]+([\.-][A-Z0-9_-]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,4})+$/i)])],
            address: ['', Validators.required],
            categorySelect: ['', Validators.required]
        });

    }

    ngOnInit() {

        this.dropdownList = [
            { item_id: 1, item_text: 'Mumbai' },
            { item_id: 2, item_text: 'Bangaluru' },
            { item_id: 3, item_text: 'Pune' },
            { item_id: 4, item_text: 'Navsari' },
            { item_id: 5, item_text: 'New Delhi' }
        ];
        this.getCategoryList()
        $('#ex-search').picker({ search: false });
    }

    getCategoryList() {
        let logindata =
            this.service.getApi('vendor/getCategoryList', 0).subscribe(response => {

                this.responseData = response;
                console.log("WWWWWWWW", this.responseData['result'])
                if (response['statusCode'] == 200) {
                    this.category = this.responseData['result'];

                    this.categoryList = this.category
                    console.log(this.categoryList)
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


    addBusinessDetail(val) {
        console.log(this.formgroup.value)
        this.sentData = {
            token: localStorage.getItem('token'),
            businessName: val.business,
            phone: val.phone,
            email: val.email,
            sellingProduct: "electronic",
            streetAddress: "noida sec 62 ",
            cityName: "delhi",
            lang: "en"
        }
        this.service.postApi('vendor/BusinessDetail', this.sentData, 1).subscribe(response => {

            this.responseData = response;
            console.log("WWWWWWWW", this.responseData)
            if (response['statusCode'] == 200) {
                this.service.showSuccess("Enter to DashBoard");
                this.route.navigate(['/dashBoard']);
            }
            else {
                this.service.showError(this.responseData['statusMessage'])
                // this.service.showError('Invalid email or password.')
            }
        }, error => {
            console.log('error occur', error)
            this.service.showError('Server Error')
        })

    }

}

import { Component, OnInit } from '@angular/core';
import { TableData } from './table-data';
import { DataService } from 'src/app/Services/provider.service';

@Component({
    selector: 'app-home-page-vendor',
    templateUrl: './home-page-vendor.component.html',
    styleUrls: ['./home-page-vendor.component.css']
})
export class HomePageVendorComponent implements OnInit {
    rows = [];
    selected = [];
    temp: any;
    timeout: any;
    public apiData: any;


    onSelect({ selected }) {
        console.log('Select Event', selected, this.selected);

        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }
    onActivate(event) {
        console.log('Activate Event', event);
    }
    add() {
        this.selected.push(this.rows[1], this.rows[3]);
    }
    update() {
        this.selected = [this.rows[1], this.rows[3]];
    }

    remove() {
        this.selected = [];
    }
    displayCheck(row) {
        return row.name !== 'Ethel Price';
    }
    updateFilter(event) {

        const val = event.target.value.toLowerCase();
        console.log("------>",this.temp)

        // // filter our data
        const temp = this.temp.filter(function (d) {
        //    var temp= d.price.toLowerCase().indexOf(val) !== -1 || !val;
           var temp=d.product.toLowerCase().indexOf(val) !== -1 || !val;
            return d.product.toLowerCase().indexOf(val) !== -1 || !val;
        });

        // // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        // this.table.offset = 0;
    }
    onPage(event) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            console.log('paged!', event);
        }, 100);
    }
    /* rows = [];
    selected = [];
    page = {
        totalElement: 3,
        pageNumber: 2
    }
    settings = {
        columns: {
            id: {
                title: 'ID'
            },
            name: {
                title: 'Full Name'
            },
            username: {
                title: 'User Name'
            },
            email: {
                title: 'Email'
            }
        }
    };

    data = [
        {
            id: 1,
            name: "Leanne Graham",
            username: "Bret",
            email: "Sincere@april.biz"
        },
        // ... other rows here
        {
            id: 11,
            name: "Nicholas DuBuque",
            username: "Nicholas.Stanton",
            email: "Rey.Padberg@rosamond.biz"
        }
    ]; */

    /*   public rows:Array<any> = [];
      public columns:Array<any> = [
        {title: 'Name', name: 'name', filtering: {filterString: '', placeholder: 'Filter by name'}},
        {
          title: 'Position',
          name: 'position',
          sort: false,
          filtering: {filterString: '', placeholder: 'Filter by position'}
        },
        {title: 'Office', className: ['office-header', 'text-success'], name: 'office', sort: 'asc'},
        {title: 'Extn.', name: 'ext', sort: '', filtering: {filterString: '', placeholder: 'Filter by extn.'}},
        {title: 'Start date', className: 'text-warning', name: 'startDate'},
        {title: 'Salary ($)', name: 'salary'}
      ];
      public page:number = 1;
      public itemsPerPage:number = 10;
      public maxSize:number = 5;
      public numPages:number = 1;
      public length:number = 0;
    
      public config:any = {
        paging: true,
        sorting: {columns: this.columns},
        filtering: {filterString: ''},
        className: ['table-striped', 'table-bordered']
      };
    
      private data:Array<any> = TableData; */

    constructor(public service: DataService) {
        // this.length = this.data.length;
     
        this.getproductList()
        // this.rows = this.apiData
        // this.temp = [...this.rows];
        // console.log('---------->>>',this.rows),
        // console.log('----------->>>',this.temp)
    }

    ngOnInit() {
        console.log("this.getproductList()", this.apiData)
        console.log('---------->>>', this.rows)
   
        // console.log('----------->>>',this.temp)
        // this.onChangeTable(this.config);
    }
    /* public changePage(page:any, data:Array<any> = this.data):Array<any> {
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
      }
    
      public changeSort(data:any, config:any):any {
        if (!config.sorting) {
          return data;
        }
    
        let columns = this.config.sorting.columns || [];
        let columnName:string = void 0;
        let sort:string = void 0;
    
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].sort !== '' && columns[i].sort !== false) {
            columnName = columns[i].name;
            sort = columns[i].sort;
          }
        }
    
        if (!columnName) {
          return data;
        }
    
        // simple sorting
        return data.sort((previous:any, current:any) => {
          if (previous[columnName] > current[columnName]) {
            return sort === 'desc' ? -1 : 1;
          } else if (previous[columnName] < current[columnName]) {
            return sort === 'asc' ? -1 : 1;
          }
          return 0;
        });
      }
    
      public changeFilter(data:any, config:any):any {
        let filteredData:Array<any> = data;
        this.columns.forEach((column:any) => {
          if (column.filtering) {
            filteredData = filteredData.filter((item:any) => {
              return item[column.name].match(column.filtering.filterString);
            });
          }
        });
    
        if (!config.filtering) {
          return filteredData;
        }
    
        if (config.filtering.columnName) {
          return filteredData.filter((item:any) =>
            item[config.filtering.columnName].match(this.config.filtering.filterString));
        }
    
        let tempArray:Array<any> = [];
        filteredData.forEach((item:any) => {
          let flag = false;
          this.columns.forEach((column:any) => {
            if (item[column.name].toString().match(this.config.filtering.filterString)) {
              flag = true;
            }
          });
          if (flag) {
            tempArray.push(item);
          }
        });
        filteredData = tempArray;
    
        return filteredData;
      }
    
      public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
        if (config.filtering) {
          Object.assign(this.config.filtering, config.filtering);
        }
    
        if (config.sorting) {
          Object.assign(this.config.sorting, config.sorting);
        }
    
        let filteredData = this.changeFilter(this.data, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
      }
    
      public onCellClick(data: any): any {
        console.log(data);
      } */
    getproductList() {
        let temp = {
            lang: "eng"
        }
        this.service.postApi('vendor/getProductList', temp, 0).subscribe(response => {

            if (response['statusCode'] == 200) {
                this.service.showSuccess("getProduct")
                // console.log("asdfasdf", response['result'])
                this.apiData = response['result'];
                this.rows = response['result'];
                this.temp = [...response['result']];
                console.log('$$$$$$$sdfsdf$$$$$$$$$$$', this.apiData)
                // this.getBrandListdata()
            }
            else {
                // console.log(response['result'])
                this.service.showError('Invalid Email')
                // this.service.showError('Invalid email or password.')
            }
        }, error => {
            console.log('error occur', error)
            this.service.showError('Server Error')
        })
    }
}

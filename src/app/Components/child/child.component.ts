import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/provider.service';
export interface myinterface {
  remove(index: number);
}
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})

export class ChildComponent implements OnInit {
  // selfRef: ChildComponent;
  // index: number;
  // compInteraction: this;
  public itemsAsObjects: any
  public index: number;
  public selfRef: ChildComponent;
  //interface for Parent-Child interaction
  public compInteraction: myinterface;
  tagChips: any;
  getOptionValue: any;
  obj: {};
  constructor(private service: DataService) { }

  ngOnInit() {
  }
  removeMe(index) {
    this.compInteraction.remove(index)
    localStorage.removeItem('optionvalue'),
    localStorage.removeItem('options')
  }

  getOptionKey(event) {
    // console.log('---------------->>>', event)
    this.getOptionValue = event
  }
  // getOptionValue(event) {
  //   console.log('================>>', event)
  // }
  getVariant(event) {
    // console.log(event)l
    let temp: any = [];
    if (this.itemsAsObjects) {
      this.itemsAsObjects.forEach(event => {
        // console.log(event.value)
        let t = event.value
        temp.push(t)
      });
      this.obj = {
        optionName: this.getOptionValue,
        option: temp
      }
      console.log(this.obj,'00000000000000',this.getOptionValue)
      
      this.service.changeOption({options: this.getOptionValue, optionvalue: temp})
      // localStorage.setItem('optionvalue',this.getOptionValue),
      localStorage.setItem('options',temp)
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-test-sumit',
  templateUrl: './test-sumit.component.html',
  styleUrls: ['./test-sumit.component.css']
})
export class TestSumitComponent implements OnInit {
  public myForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this._fb.group({
      FrontEnd: ['',],
      front:['',],
      React:['',],
      angular:['',],
      languages: this._fb.array([
        this.initlanguage(),
      ])
    });
    // console.log('---------------->>>>',this.myForm)
  }
  initlanguage() {
    return this._fb.group({
      Angular2: [''],
      React: ['']
    });
  }

  addLanguage() {
    const control = <FormArray>this.myForm.controls['languages'];
    console.log('-==-=-=-=-=>>>',control)
    control.push(this.initlanguage());
  }

  removeLanguage(i: number) {
    const control = <FormArray>this.myForm.controls['languages'];
    control.removeAt(i);
  }

  save() {
    console.log("save model")
  }

}

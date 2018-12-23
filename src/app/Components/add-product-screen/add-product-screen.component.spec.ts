import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductScreenComponent } from './add-product-screen.component';

describe('AddProductScreenComponent', () => {
  let component: AddProductScreenComponent;
  let fixture: ComponentFixture<AddProductScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

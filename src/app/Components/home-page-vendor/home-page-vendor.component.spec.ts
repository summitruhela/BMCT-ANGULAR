import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageVendorComponent } from './home-page-vendor.component';

describe('HomePageVendorComponent', () => {
  let component: HomePageVendorComponent;
  let fixture: ComponentFixture<HomePageVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

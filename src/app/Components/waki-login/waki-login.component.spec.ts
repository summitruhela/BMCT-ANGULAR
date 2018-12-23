import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakiLoginComponent } from './waki-login.component';

describe('WakiLoginComponent', () => {
  let component: WakiLoginComponent;
  let fixture: ComponentFixture<WakiLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakiLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakiLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

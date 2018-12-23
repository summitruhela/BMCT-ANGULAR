import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterPasswordScreenComponent } from './enter-password-screen.component';

describe('EnterPasswordScreenComponent', () => {
  let component: EnterPasswordScreenComponent;
  let fixture: ComponentFixture<EnterPasswordScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterPasswordScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterPasswordScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

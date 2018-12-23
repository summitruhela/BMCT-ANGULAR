import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSumitComponent } from './test-sumit.component';

describe('TestSumitComponent', () => {
  let component: TestSumitComponent;
  let fixture: ComponentFixture<TestSumitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSumitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSumitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

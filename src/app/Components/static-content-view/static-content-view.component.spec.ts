import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticContentViewComponent } from './static-content-view.component';

describe('StaticContentViewComponent', () => {
  let component: StaticContentViewComponent;
  let fixture: ComponentFixture<StaticContentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticContentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticContentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

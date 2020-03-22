import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemobannerComponent } from './demobanner.component';

describe('DemobannerComponent', () => {
  let component: DemobannerComponent;
  let fixture: ComponentFixture<DemobannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemobannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemobannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

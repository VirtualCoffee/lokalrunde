import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPlaceComponent } from './register-place.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RegisterPlaceComponent', () => {
  let component: RegisterPlaceComponent;
  let fixture: ComponentFixture<RegisterPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPlaceComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacePageComponent } from './place-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PlacePageComponent', () => {
  let component: PlacePageComponent;
  let fixture: ComponentFixture<PlacePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacePageComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

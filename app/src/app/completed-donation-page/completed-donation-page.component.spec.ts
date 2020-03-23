import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedDonationPageComponent } from './completed-donation-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CompletedDonationPageComponent', () => {
  let component: CompletedDonationPageComponent;
  let fixture: ComponentFixture<CompletedDonationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedDonationPageComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedDonationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedDonationPageComponent } from './completed-donation-page.component';

describe('CompletedDonationPageComponent', () => {
  let component: CompletedDonationPageComponent;
  let fixture: ComponentFixture<CompletedDonationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedDonationPageComponent ]
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

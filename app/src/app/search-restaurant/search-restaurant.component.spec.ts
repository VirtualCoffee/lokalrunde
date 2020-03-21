import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRestaurantComponent } from './search-restaurant.component';

describe('SearchRestaurantComponent', () => {
  let component: SearchRestaurantComponent;
  let fixture: ComponentFixture<SearchRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

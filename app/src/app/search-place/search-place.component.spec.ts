import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPlaceComponent } from './search-place.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SearchPlaceComponent', () => {
  let component: SearchPlaceComponent;
  let fixture: ComponentFixture<SearchPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPlaceComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

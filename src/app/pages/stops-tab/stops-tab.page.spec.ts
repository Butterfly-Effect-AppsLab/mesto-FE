import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopsTabPage } from './stops-tab.page';

describe('StopsTabPage', () => {
  let component: StopsTabPage;
  let fixture: ComponentFixture<StopsTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopsTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopsTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesTabPage } from './routes-tab.page';

describe('RoutesTabPage', () => {
  let component: RoutesTabPage;
  let fixture: ComponentFixture<RoutesTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

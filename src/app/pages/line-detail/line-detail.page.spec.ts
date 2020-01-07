import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineDetailPage } from './line-detail.page';

describe('LineDetailPage', () => {
  let component: LineDetailPage;
  let fixture: ComponentFixture<LineDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

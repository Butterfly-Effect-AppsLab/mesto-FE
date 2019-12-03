import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinesTabPage } from './lines-tab.page';

describe('LinesTabPage', () => {
  let component: LinesTabPage;
  let fixture: ComponentFixture<LinesTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinesTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinesTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

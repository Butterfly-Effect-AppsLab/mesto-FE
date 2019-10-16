import { TestBed } from '@angular/core/testing';

import { SlovnaftService } from './slovnaft.service';

describe('SlovnaftService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SlovnaftService = TestBed.get(SlovnaftService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { InternalStorageService } from './internal-storage.service';

describe('InternalStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InternalStorageService = TestBed.get(InternalStorageService);
    expect(service).toBeTruthy();
  });
});

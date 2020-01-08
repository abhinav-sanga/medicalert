import { TestBed } from '@angular/core/testing';

import { PopulateDataService } from './populate-data.service';

describe('PopulateDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopulateDataService = TestBed.get(PopulateDataService);
    expect(service).toBeTruthy();
  });
});

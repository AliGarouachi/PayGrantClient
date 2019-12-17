import { TestBed } from '@angular/core/testing';

import { OpperationService } from './opperation.service';

describe('OpperationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpperationService = TestBed.get(OpperationService);
    expect(service).toBeTruthy();
  });
});

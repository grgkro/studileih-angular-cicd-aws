import { TestBed } from '@angular/core/testing';

import { ApplicationStateService } from './application-state-service.service';

describe('ApplicationStateServiceService', () => {
  let service: ApplicationStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

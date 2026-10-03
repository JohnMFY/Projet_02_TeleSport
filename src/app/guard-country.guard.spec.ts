import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardCountryGuard } from './guard-country.guard';

describe('guardCountryGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardCountryGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

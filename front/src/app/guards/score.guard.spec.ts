import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { scoreGuard } from './score.guard';

describe('scoreGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => scoreGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

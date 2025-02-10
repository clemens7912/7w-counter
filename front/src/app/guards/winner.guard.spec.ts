import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { winnerGuard } from './winner.guard';

describe('winnerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => winnerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AppNameTitleStrategyService } from './app-name-title-strategy.service';

describe('AppNameTitleStrategyService', () => {
  let service: AppNameTitleStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppNameTitleStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

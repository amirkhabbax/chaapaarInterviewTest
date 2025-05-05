import { TestBed } from '@angular/core/testing';

import { GetFormService } from './get-form.service';

describe('GetFormService', () => {
  let service: GetFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

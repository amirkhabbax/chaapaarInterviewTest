import { TestBed } from '@angular/core/testing';

import { GetFormService } from './get-form.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';

describe('GetFormService', () => {
  let service: GetFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        provideHttpClient(),
      ],
    });
    service = TestBed.inject(GetFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { GrService } from './gr.service';

describe('GrService', () => {
  let service: GrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

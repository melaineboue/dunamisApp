import { TestBed } from '@angular/core/testing';

import { ReunionGrService } from './reunion-gr.service';

describe('ReunionGrService', () => {
  let service: ReunionGrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReunionGrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

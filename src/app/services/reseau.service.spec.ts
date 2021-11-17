import { TestBed } from '@angular/core/testing';

import { ReseauService } from './reseau.service';

describe('ReseauService', () => {
  let service: ReseauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReseauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

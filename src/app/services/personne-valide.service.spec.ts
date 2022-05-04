import { TestBed } from '@angular/core/testing';

import { PersonneValideService } from './personne-valide.service';

describe('PersonneValideService', () => {
  let service: PersonneValideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonneValideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

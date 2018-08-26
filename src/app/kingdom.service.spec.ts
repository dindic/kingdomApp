import { TestBed, inject } from '@angular/core/testing';

import { KingdomService } from './kingdom.service';

describe('KingdomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KingdomService]
    });
  });

  it('should be created', inject([KingdomService], (service: KingdomService) => {
    expect(service).toBeTruthy();
  }));
});

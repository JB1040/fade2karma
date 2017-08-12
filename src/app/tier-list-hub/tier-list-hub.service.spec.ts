import { TestBed, inject } from '@angular/core/testing';

import { TierListHubService } from './tier-list-hub.service';

describe('TierListHubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TierListHubService]
    });
  });

  it('should be created', inject([TierListHubService], (service: TierListHubService) => {
    expect(service).toBeTruthy();
  }));
});

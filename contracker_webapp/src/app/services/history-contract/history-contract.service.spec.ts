import { TestBed } from '@angular/core/testing';

import { HistoryContractService } from './history-contract.service';

describe('HistoryContractService', () => {
  let service: HistoryContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

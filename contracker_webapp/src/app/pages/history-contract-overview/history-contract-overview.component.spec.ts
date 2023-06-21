import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryContractOverviewComponent } from './history-contract-overview.component';

describe('HistoryContractOverviewComponent', () => {
  let component: HistoryContractOverviewComponent;
  let fixture: ComponentFixture<HistoryContractOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryContractOverviewComponent]
    });
    fixture = TestBed.createComponent(HistoryContractOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarContractOverviewComponent } from './bar-contract-overview.component';

describe('BarContractOverviewComponent', () => {
  let component: BarContractOverviewComponent;
  let fixture: ComponentFixture<BarContractOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarContractOverviewComponent]
    });
    fixture = TestBed.createComponent(BarContractOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

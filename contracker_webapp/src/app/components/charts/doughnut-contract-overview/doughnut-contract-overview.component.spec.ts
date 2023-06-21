import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutContractOverviewComponent } from './doughnut-contract-overview.component';

describe('DoughnutContractOverviewComponent', () => {
  let component: DoughnutContractOverviewComponent;
  let fixture: ComponentFixture<DoughnutContractOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoughnutContractOverviewComponent]
    });
    fixture = TestBed.createComponent(DoughnutContractOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

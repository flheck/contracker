import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineCostProgressionComponent } from './line-cost-progression.component';

describe('LineCostProgressionComponent', () => {
  let component: LineCostProgressionComponent;
  let fixture: ComponentFixture<LineCostProgressionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineCostProgressionComponent]
    });
    fixture = TestBed.createComponent(LineCostProgressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

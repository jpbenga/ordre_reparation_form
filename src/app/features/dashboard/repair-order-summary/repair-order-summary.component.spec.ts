import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairOrderSummaryComponent } from './repair-order-summary.component';

describe('RepairOrderSummaryComponent', () => {
  let component: RepairOrderSummaryComponent;
  let fixture: ComponentFixture<RepairOrderSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepairOrderSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairOrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDataExportComponent } from './order-data-export.component';

describe('OrderDataExportComponent', () => {
  let component: OrderDataExportComponent;
  let fixture: ComponentFixture<OrderDataExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDataExportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDataExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

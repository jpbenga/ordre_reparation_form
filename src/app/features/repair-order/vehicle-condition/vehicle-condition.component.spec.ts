import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleConditionComponent } from './vehicle-condition.component';

describe('VehicleConditionComponent', () => {
  let component: VehicleConditionComponent;
  let fixture: ComponentFixture<VehicleConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleConditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

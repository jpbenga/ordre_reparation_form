import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarChassis } from './car-chassis.component';

describe('CarChassis', () => {
  let component: CarChassis;
  let fixture: ComponentFixture<CarChassis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarChassis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarChassis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

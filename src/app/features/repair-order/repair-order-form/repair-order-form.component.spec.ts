import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairOrderFormComponent } from './repair-order-form.component';

describe('RepairOrderFormComponent', () => {
  let component: RepairOrderFormComponent;
  let fixture: ComponentFixture<RepairOrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepairOrderFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

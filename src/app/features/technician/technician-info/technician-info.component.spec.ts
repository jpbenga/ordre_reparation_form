import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianInfoComponent } from './technician-info.component';

describe('TechnicianInfoComponent', () => {
  let component: TechnicianInfoComponent;
  let fixture: ComponentFixture<TechnicianInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicianInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

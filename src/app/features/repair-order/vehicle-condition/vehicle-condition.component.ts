import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleCondition } from '../../../shared/models/repair-order.model';
import { CarChassisComponent } from '../../../shared/components/car-chassis/car-chassis.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-vehicle-condition',
  standalone: true,
  imports: [
    CommonModule,
    CarChassisComponent,
    ButtonComponent
  ],
  templateUrl: './vehicle-condition.component.html',
  styleUrl: './vehicle-condition.component.scss'
})
export class VehicleConditionComponent {
  @Input() data: VehicleCondition = {
    frontLeft: '',
    frontRight: '',
    rearLeft: '',
    rearRight: ''
  };
  
  @Output() dataChange = new EventEmitter<VehicleCondition>();
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  onConditionChange(newCondition: VehicleCondition): void {
    this.data = newCondition;
    this.dataChange.emit(this.data);
  }

  onNext(): void {
    this.nextStep.emit();
  }

  onPrevious(): void {
    this.previousStep.emit();
  }
}
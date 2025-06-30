import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleCondition } from '../../models/repair-order.model';

@Component({
  selector: 'app-car-chassis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-chassis.component.html',
  styleUrl: './car-chassis.component.scss'
})
export class CarChassisComponent {
  @Input() values: VehicleCondition = {
    frontLeft: '',
    frontRight: '',
    rearLeft: '',
    rearRight: ''
  };
  
  @Output() valuesChange = new EventEmitter<VehicleCondition>();

  onValueChange(position: keyof VehicleCondition, value: string): void {
    const newValues = { ...this.values, [position]: value };
    this.valuesChange.emit(newValues);
  }
}
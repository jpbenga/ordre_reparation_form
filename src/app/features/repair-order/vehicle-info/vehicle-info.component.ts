import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleInfo } from '../../../shared/models/repair-order.model';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { DropdownComponent } from '../../../shared/components/dropdown/dropdown.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-vehicle-info',
  standalone: true,
  imports: [
    CommonModule,
    InputFieldComponent,
    DropdownComponent,
    ButtonComponent
  ],
  templateUrl: './vehicle-info.component.html',
  styleUrl: './vehicle-info.component.scss'
})
export class VehicleInfoComponent {
  @Input() data: VehicleInfo = {
    registration: '',
    brand: '',
    mileage: ''
  };
  
  @Output() dataChange = new EventEmitter<VehicleInfo>();
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  carBrands = [
    'Audi', 'BMW', 'Citroën', 'Dacia', 'Fiat', 'Ford', 
    'Honda', 'Hyundai', 'Kia', 'Mercedes', 'Nissan', 
    'Opel', 'Peugeot', 'Renault', 'Seat', 'Skoda', 
    'Toyota', 'Volkswagen', 'Volvo'
  ];

  errors = {
    registration: '',
    brand: '',
    mileage: ''
  };

  onFieldChange(field: keyof VehicleInfo, value: string): void {
    this.data = { ...this.data, [field]: value };
    this.dataChange.emit(this.data);
    
    // Clear error when user starts typing
    if (this.errors[field as keyof typeof this.errors] !== undefined) {
      this.errors[field as keyof typeof this.errors] = '';
    }
  }

  validate(): boolean {
    this.errors = {
      registration: '',
      brand: '',
      mileage: ''
    };

    if (!this.data.registration.trim()) {
      this.errors.registration = "L'immatriculation est requise";
    }

    if (!this.data.brand) {
      this.errors.brand = 'La marque est requise';
    }

    if (!this.data.mileage.trim()) {
      this.errors.mileage = 'Le kilométrage est requis';
    } else if (isNaN(Number(this.data.mileage))) {
      this.errors.mileage = 'Le kilométrage doit être un nombre';
    }

    return !Object.values(this.errors).some(error => error);
  }

  onNext(): void {
    if (this.validate()) {
      this.nextStep.emit();
    }
  }

  onPrevious(): void {
    this.previousStep.emit();
  }
}
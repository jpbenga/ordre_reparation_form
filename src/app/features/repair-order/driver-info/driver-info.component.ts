import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverInfo } from '../../../shared/models/repair-order.model';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-driver-info',
  standalone: true,
  imports: [
    CommonModule,
    InputFieldComponent,
    ButtonComponent
  ],
  templateUrl: './driver-info.component.html',
  styleUrl: './driver-info.component.scss'
})
export class DriverInfoComponent {
  @Input() data: DriverInfo = {
    firstName: '',
    lastName: '',
    company: ''
  };
  
  @Output() dataChange = new EventEmitter<DriverInfo>();
  @Output() nextStep = new EventEmitter<void>();

  errors = {
    firstName: '',
    lastName: '',
    company: ''
  };

  onFieldChange(field: keyof DriverInfo, value: string): void {
    this.data = { ...this.data, [field]: value };
    this.dataChange.emit(this.data);
    
    if (this.errors[field as keyof typeof this.errors] !== undefined) {
      this.errors[field as keyof typeof this.errors] = '';
    }
  }

  validate(): boolean {
    this.errors = {
      firstName: '',
      lastName: '',
      company: ''
    };

    if (!this.data.firstName.trim()) {
      this.errors.firstName = 'Le prénom est requis';
    }

    if (!this.data.lastName.trim()) {
      this.errors.lastName = 'Le nom est requis';
    }

    if (!this.data.company.trim()) {
      this.errors.company = 'La société est requise';
    }

    return !Object.values(this.errors).some(error => error);
  }

  onNext(): void {
    if (this.validate()) {
      this.nextStep.emit();
    }
  }
}
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnicianInfo } from '../../../shared/models/repair-order.model';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-technician-info',
  standalone: true,
  imports: [
    CommonModule,
    InputFieldComponent,
    ButtonComponent,
    MatCardModule
  ],
  templateUrl: './technician-info.component.html',
  styleUrl: './technician-info.component.scss'
})
export class TechnicianInfoComponent {
  @Output() submitTechnician = new EventEmitter<TechnicianInfo>();

  techData: TechnicianInfo = {
    name: '',
    date: new Date().toISOString().split('T')[0]
  };

  errors = {
    name: ''
  };

  onNameChange(value: string): void {
    this.techData.name = value;
    if (this.errors.name) {
      this.errors.name = '';
    }
  }

  onDateChange(value: string): void {
    this.techData.date = value;
  }

  validate(): boolean {
    this.errors.name = '';

    if (!this.techData.name.trim()) {
      this.errors.name = 'Le nom est requis';
    }

    return !this.errors.name;
  }

  onSubmit(): void {
    if (this.validate()) {
      this.submitTechnician.emit(this.techData);
    }
  }
}
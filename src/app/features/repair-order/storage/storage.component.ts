import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageInfo } from '../../../shared/models/repair-order.model';
import { CheckboxComponent } from '../../../shared/components/checkbox/checkbox.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-storage',
  standalone: true,
  imports: [
    CommonModule,
    CheckboxComponent,
    InputFieldComponent,
    ButtonComponent,
    MatCardModule
  ],
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.scss'
})
export class StorageComponent {
  @Input() data: StorageInfo = {
    completeWheel: false,
    hubcap: false,
    screws: false,
    profile: '',
    location: ''
  };
  
  @Output() dataChange = new EventEmitter<StorageInfo>();
  @Output() previousStep = new EventEmitter<void>();
  @Output() finishOrder = new EventEmitter<void>();

  onCheckboxChange(field: keyof Pick<StorageInfo, 'completeWheel' | 'hubcap' | 'screws'>, checked: boolean): void {
    this.data = { ...this.data, [field]: checked };
    this.dataChange.emit(this.data);
  }

  onFieldChange(field: keyof Pick<StorageInfo, 'profile' | 'location'>, value: string): void {
    this.data = { ...this.data, [field]: value };
    this.dataChange.emit(this.data);
  }

  onPrevious(): void {
    this.previousStep.emit();
  }

  onFinish(): void {
    this.finishOrder.emit();
  }
}
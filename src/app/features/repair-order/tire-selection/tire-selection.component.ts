import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TireInfo } from '../../../shared/models/repair-order.model';
import { RadioGroupComponent, RadioOption } from '../../../shared/components/radio-group/radio-group.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-tire-selection',
  standalone: true,
  imports: [
    CommonModule,
    RadioGroupComponent,
    ButtonComponent,
    MatCardModule
  ],
  templateUrl: './tire-selection.component.html',
  styleUrl: './tire-selection.component.scss'
})
export class TireSelectionComponent {
  @Input() data: TireInfo = {
    front: '',
    rear: ''
  };
  
  @Output() dataChange = new EventEmitter<TireInfo>();
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  tireOptions: RadioOption[] = [
    { value: 'summer', label: 'Été' },
    { value: 'winter', label: 'Hiver' },
    { value: 'allSeason', label: '4 Saisons' }
  ];

  onFrontTireChange(value: string): void {
    this.data = { ...this.data, front: value };
    this.dataChange.emit(this.data);
  }

  onRearTireChange(value: string): void {
    this.data = { ...this.data, rear: value };
    this.dataChange.emit(this.data);
  }

  onNext(): void {
    this.nextStep.emit();
  }

  onPrevious(): void {
    this.previousStep.emit();
  }
}
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';

export interface RadioOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-radio-group',
  standalone: true,
  imports: [CommonModule, MatRadioModule],
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.scss'
})
export class RadioGroupComponent {
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() options: RadioOption[] = [];
  @Input() value: string = '';
  @Input() required: boolean = false;
  
  @Output() valueChange = new EventEmitter<string>();

  onValueChange(value: string): void {
    this.valueChange.emit(value);
  }
}
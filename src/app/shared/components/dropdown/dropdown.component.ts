import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() options: string[] = [];
  @Input() required: boolean = false;
  @Input() error: string = '';
  @Input() placeholder: string = 'Sélectionner';
  
  @Output() valueChange = new EventEmitter<string>();

  onValueChange(value: string): void {
    this.valueChange.emit(value);
  }
}
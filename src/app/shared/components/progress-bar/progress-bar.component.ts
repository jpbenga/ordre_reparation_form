import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {
  @Input() currentStep: number = 1;
  @Input() totalSteps: number = 5;

  get progress(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }

  get steps(): Array<{ number: number; label: string; status: 'completed' | 'current' | 'pending' }> {
    const labels = ['Conducteur', 'Véhicule', 'État', 'Pneumatiques', 'Gardiennage'];
    
    return Array.from({ length: this.totalSteps }, (_, i) => ({
      number: i + 1,
      label: labels[i],
      status: i + 1 < this.currentStep ? 'completed' : 
              i + 1 === this.currentStep ? 'current' : 'pending'
    }));
  }
}
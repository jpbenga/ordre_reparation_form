import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepairOrder } from '../../../shared/models/repair-order.model';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-order-data-export',
  standalone: true,
  imports: [CommonModule, MatIconModule, ButtonComponent],
  templateUrl: './order-data-export.component.html',
  styleUrls: ['./order-data-export.component.scss']
})
export class OrderDataExportComponent {
  @Input() order!: RepairOrder;
  @Output() close = new EventEmitter<void>();
  @Output() addSignature = new EventEmitter<string>();

  formatDate(dateString?: string): string {
    if (!dateString) return 'Non spécifié';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  handlePrint(): void {
    window.print();
  }

  hasData(section: any): boolean {
    if (!section) return false;
    return Object.values(section).some(
      (value) => value !== undefined && value !== null && value !== ''
    );
  }

  formatBoolean(value: boolean | undefined): string {
    return value ? 'Oui' : 'Non';
  }

  handleAddSignature(): void {
    this.addSignature.emit(this.order.id);
  }
}
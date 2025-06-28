import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepairOrder, TechnicianInfo } from '../../../shared/models/repair-order.model';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-technician-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './technician-dashboard.component.html',
  styleUrl: './technician-dashboard.component.scss'
})
export class TechnicianDashboardComponent {
  @Input() technicianInfo!: TechnicianInfo;
  @Input() repairOrders: RepairOrder[] = [];
  
  @Output() startNewOrder = new EventEmitter<void>();
  @Output() editOrder = new EventEmitter<string>();
  @Output() deleteOrder = new EventEmitter<string>();
  @Output() sendForBilling = new EventEmitter<void>();

  get ordersByCompany(): { [company: string]: RepairOrder[] } {
    return this.repairOrders.reduce((acc, order) => {
      const company = order.driver.company || 'Particulier';
      if (!acc[company]) {
        acc[company] = [];
      }
      acc[company].push(order);
      return acc;
    }, {} as { [company: string]: RepairOrder[] });
  }

  get companyEntries(): [string, RepairOrder[]][] {
    return Object.entries(this.ordersByCompany);
  }

  onStartNew(): void {
    this.startNewOrder.emit();
  }

  onEdit(orderId: string): void {
    this.editOrder.emit(orderId);
  }

  onDelete(orderId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet ordre de réparation ?')) {
      this.deleteOrder.emit(orderId);
    }
  }

  onSendForBilling(): void {
    if (confirm(`Envoyer ${this.repairOrders.length} ordres de réparation pour facturation ?`)) {
      this.sendForBilling.emit();
    }
  }

  getTireTypeLabel(type: string): string {
    switch (type) {
      case 'summer': return 'Été';
      case 'winter': return 'Hiver';
      case 'allSeason': return '4 Saisons';
      default: return type;
    }
  }
}
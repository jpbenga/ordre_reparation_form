import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepairOrder } from '../../../shared/models/repair-order.model';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-repair-order-summary',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    MatCardModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './repair-order-summary.component.html',
  styleUrl: './repair-order-summary.component.scss'
})
export class RepairOrderSummaryComponent {
  @Input() repairOrders: RepairOrder[] = [];
  
  @Output() backToDashboard = new EventEmitter<void>();
  @Output() sendForBilling = new EventEmitter<void>();

  // Ajouter cette propriété pour la date
  get currentDate(): Date {
    return new Date();
  }

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

  get totalOrders(): number {
    return this.repairOrders.length;
  }

  get totalCompanies(): number {
    return Object.keys(this.ordersByCompany).length;
  }

  onBack(): void {
    this.backToDashboard.emit();
  }

  onSendForBilling(): void {
    this.sendForBilling.emit();
  }

  onPrint(): void {
    window.print();
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
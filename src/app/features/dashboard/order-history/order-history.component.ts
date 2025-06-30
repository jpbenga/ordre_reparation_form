import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepairOrder } from '../../../shared/models/repair-order.model';
import { RepairOrderService } from '../../../core/services/repair-order.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    MatIconModule
  ],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent implements OnInit {
  @Input() technicianName: string = '';
  
  @Output() backToDashboard = new EventEmitter<void>();
  @Output() editOrder = new EventEmitter<string>();
  @Output() sendForBilling = new EventEmitter<RepairOrder[]>();

  historicalOrders: RepairOrder[] = [];
  selectedOrders: string[] = [];
  filterDate: string = '';

  constructor(private repairOrderService: RepairOrderService) {}

  ngOnInit(): void {
    // Charger les ordres depuis le localStorage
    this.historicalOrders = this.repairOrderService.getOrderHistory(this.technicianName);
  }

  onBack(): void {
    this.backToDashboard.emit();
  }

  onEdit(orderId: string): void {
    this.editOrder.emit(orderId);
  }

  onOrderSelection(orderId: string): void {
    if (this.selectedOrders.includes(orderId)) {
      this.selectedOrders = this.selectedOrders.filter(id => id !== orderId);
    } else {
      this.selectedOrders = [...this.selectedOrders, orderId];
    }
  }

  onSendSelected(): void {
    const ordersToSend = this.historicalOrders.filter(order => 
      this.selectedOrders.includes(order.id)
    );
    this.sendForBilling.emit(ordersToSend);
  }

  onFilterDateChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.filterDate = target.value;
  }

  onResetFilter(): void {
    this.filterDate = '';
  }

  // Filtrer les ordres par date si une date est sélectionnée
  get filteredOrders(): RepairOrder[] {
    if (!this.filterDate) {
      return this.historicalOrders;
    }
    
    return this.historicalOrders.filter(order => {
      const orderDate = new Date(order.date).toISOString().split('T')[0];
      return orderDate === this.filterDate;
    });
  }

  // Grouper les ordres par date
  get ordersByDate(): { [date: string]: RepairOrder[] } {
    return this.filteredOrders.reduce((acc, order) => {
      const date = new Date(order.date).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(order);
      return acc;
    }, {} as { [date: string]: RepairOrder[] });
  }

  // Entrées triées par date (plus récente en premier)
  get sortedDateEntries(): [string, RepairOrder[]][] {
    return Object.entries(this.ordersByDate).sort(
      ([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime()
    );
  }

  // Formatage des dates en français
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Expose Object.keys pour le template
  Object = Object;
}
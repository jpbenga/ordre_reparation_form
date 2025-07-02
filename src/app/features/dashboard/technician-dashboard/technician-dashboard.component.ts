import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepairOrder, TechnicianInfo } from '../../../shared/models/repair-order.model';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-technician-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './technician-dashboard.component.html',
  styleUrls: ['./technician-dashboard.component.scss']
})
export class TechnicianDashboardComponent implements OnChanges {
  @Input() technicianInfo!: TechnicianInfo;
  @Input() repairOrders: RepairOrder[] = [];

  @Output() startNewOrder = new EventEmitter<void>();
  @Output() editOrder = new EventEmitter<string>();
  @Output() updateOrder = new EventEmitter<RepairOrder>();
  @Output() deleteOrder = new EventEmitter<string>();
  @Output() sendForBilling = new EventEmitter<void>();
  @Output() viewHistory = new EventEmitter<void>();
  @Output() showHelp = new EventEmitter<void>();

  ordersToFinalize: RepairOrder[] = [];
  regularOrders: RepairOrder[] = [];
  regularOrdersByCompany: { [company: string]: RepairOrder[] } = {};
  finalizeOrdersByCompany: { [company: string]: RepairOrder[] } = {};
  regularCompanyEntries: [string, RepairOrder[]][] = [];
  finalizeCompanyEntries: [string, RepairOrder[]][] = [];

  editingLocationOrder: RepairOrder | null = null;
  tempOutboundLocation: string = '';
  tempInboundLocation: string = '';

  constructor(public dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['repairOrders']) {
      this.updateOrderLists();
    }
  }

  private updateOrderLists(): void {
    this.ordersToFinalize = this.repairOrders.filter(order => {
      const outboundNeedsLocation = order.storage?.outbound?.isBackAtCenter && order.storage?.outbound?.count && !order.storage?.outbound?.location;
      const inboundNeedsLocation = order.storage?.inbound?.isBackAtCenter && order.storage?.inbound?.count && !order.storage?.inbound?.location;
      return outboundNeedsLocation || inboundNeedsLocation;
    });

    const toFinalizeIds = this.ordersToFinalize.map(o => o.id);
    this.regularOrders = this.repairOrders.filter(order => !toFinalizeIds.includes(order.id));

    this.regularOrdersByCompany = this.groupOrdersByCompany(this.regularOrders);
    this.finalizeOrdersByCompany = this.groupOrdersByCompany(this.ordersToFinalize);
    this.regularCompanyEntries = Object.entries(this.regularOrdersByCompany);
    this.finalizeCompanyEntries = Object.entries(this.finalizeOrdersByCompany);
  }

  private groupOrdersByCompany(orders: RepairOrder[]): { [company: string]: RepairOrder[] } {
    return orders.reduce((acc, order) => {
      const company = order.driver.company || 'Particulier';
      if (!acc[company]) {
        acc[company] = [];
      }
      acc[company].push(order);
      return acc;
    }, {} as { [company: string]: RepairOrder[] });
  }

  startEditingLocation(order: RepairOrder): void {
    this.editingLocationOrder = order;
    this.tempOutboundLocation = order.storage?.outbound?.location || '';
    this.tempInboundLocation = order.storage?.inbound?.location || '';
  }

  cancelEditingLocation(): void {
    this.editingLocationOrder = null;
    this.tempOutboundLocation = '';
    this.tempInboundLocation = '';
  }

  saveLocation(): void {
    if (!this.editingLocationOrder) return;
    const updatedOrder = JSON.parse(JSON.stringify(this.editingLocationOrder));

    if (updatedOrder.storage.outbound?.isBackAtCenter && updatedOrder.storage.outbound?.count) {
      updatedOrder.storage.outbound.location = this.tempOutboundLocation;
    }
    if (updatedOrder.storage.inbound?.isBackAtCenter && updatedOrder.storage.inbound?.count) {
      updatedOrder.storage.inbound.location = this.tempInboundLocation;
    }

    this.updateOrder.emit(updatedOrder);
    this.cancelEditingLocation();
  }

  onStartNew(): void {
    this.startNewOrder.emit();
  }

  onEdit(orderId: string): void {
    this.editOrder.emit(orderId);
  }

  onDelete(orderId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmer la suppression',
        message: 'Êtes-vous sûr de vouloir supprimer cet ordre de réparation ? Cette action est irréversible.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteOrder.emit(orderId);
      }
    });
  }

  onSendForBilling(): void {
    if (this.ordersToFinalize.length > 0) {
      alert("Impossible d'envoyer pour facturation : certains ordres ont des emplacements à renseigner.");
      return;
    }
    if (confirm(`Envoyer ${this.repairOrders.length} ordres de réparation pour facturation ?`)) {
      this.sendForBilling.emit();
    }
  }

  onViewHistory(): void {
    this.viewHistory.emit();
  }

  onShowHelp(): void {
    this.showHelp.emit();
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
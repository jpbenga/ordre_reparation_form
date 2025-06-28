import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepairOrder, TechnicianInfo } from '../shared/models/repair-order.model';
import { RepairOrderService } from '../core/services/repair-order.service';
import { HeaderComponent } from '../shared/components/header/header.component';
import { TechnicianInfoComponent } from '../features/technician/technician-info/technician-info.component';
import { TechnicianDashboardComponent } from '../features/dashboard/technician-dashboard/technician-dashboard.component';
import { RepairOrderFormComponent } from '../features/repair-order/repair-order-form/repair-order-form.component';
import { RepairOrderSummaryComponent } from '../features/dashboard/repair-order-summary/repair-order-summary.component';

type AppView = 'technician-login' | 'dashboard' | 'new-order' | 'edit-order' | 'summary';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    TechnicianInfoComponent,
    TechnicianDashboardComponent,
    RepairOrderFormComponent,
    RepairOrderSummaryComponent
  ],
  templateUrl: './app-container.component.html',
  styleUrl: './app-container.component.scss'
})
export class AppContainerComponent implements OnInit {
  currentView: AppView = 'technician-login';
  currentEditingOrder: RepairOrder | null = null;
  
  technicianInfo: TechnicianInfo | null = null;
  repairOrders: RepairOrder[] = [];

  constructor(private repairOrderService: RepairOrderService) {}

  ngOnInit(): void {
    // S'abonner aux observables du service
    this.repairOrderService.technicianInfo$.subscribe(info => {
      this.technicianInfo = info;
    });

    this.repairOrderService.repairOrders$.subscribe(orders => {
      this.repairOrders = orders;
    });
  }

  // Gestion de l'identification du technicien
  onTechnicianLogin(techInfo: TechnicianInfo): void {
    this.repairOrderService.setTechnicianInfo(techInfo);
    this.currentView = 'dashboard';
  }

  // Navigation vers un nouvel ordre
  onStartNewOrder(): void {
    this.currentEditingOrder = null;
    this.currentView = 'new-order';
  }

  // Navigation vers l'édition d'un ordre existant
  onEditOrder(orderId: string): void {
    const orderToEdit = this.repairOrders.find(order => order.id === orderId);
    if (orderToEdit) {
      this.currentEditingOrder = orderToEdit;
      this.currentView = 'edit-order';
    }
  }

  // Suppression d'un ordre
  onDeleteOrder(orderId: string): void {
    this.repairOrderService.deleteRepairOrder(orderId);
  }

  // Sauvegarde d'un ordre (nouveau ou modifié)
  onSaveOrder(order: RepairOrder): void {
    if (this.currentEditingOrder) {
      // Mise à jour d'un ordre existant
      this.repairOrderService.updateRepairOrder(order);
    } else {
      // Création d'un nouvel ordre
      this.repairOrderService.addRepairOrder(order);
    }
    
    this.currentEditingOrder = null;
    this.currentView = 'dashboard';
  }

  // Retour au tableau de bord
  onBackToDashboard(): void {
    this.currentEditingOrder = null;
    this.currentView = 'dashboard';
  }

  // Navigation vers le récapitulatif
  onViewSummary(): void {
    this.currentView = 'summary';
  }

  // Envoi pour facturation
  onSendForBilling(): void {
    const orderCount = this.repairOrders.length;
    
    if (orderCount > 0) {
      alert(`${orderCount} ordres de réparation envoyés pour facturation.`);
      this.repairOrderService.clearAllOrders();
      this.currentView = 'dashboard';
    }
  }

  // Déconnexion (retour à l'identification)
  onLogout(): void {
    this.repairOrderService.setTechnicianInfo({
      name: '',
      date: new Date().toISOString().split('T')[0]
    });
    this.repairOrderService.clearAllOrders();
    this.currentView = 'technician-login';
  }
}
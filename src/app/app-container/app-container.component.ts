import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepairOrder, TechnicianInfo } from '../shared/models/repair-order.model';
import { RepairOrderService } from '../core/services/repair-order.service';
import { HeaderComponent } from '../shared/components/header/header.component';
import { TechnicianInfoComponent } from '../features/technician/technician-info/technician-info.component';
import { TechnicianDashboardComponent } from '../features/dashboard/technician-dashboard/technician-dashboard.component';
import { RepairOrderFormComponent } from '../features/repair-order/repair-order-form/repair-order-form.component';
import { RepairOrderSummaryComponent } from '../features/dashboard/repair-order-summary/repair-order-summary.component';
import { OrderHistoryComponent } from '../features/dashboard/order-history/order-history.component';
import { LocalStorageService } from '../core/services/local-storage.service';
import { OnboardingComponent } from '../features/onboarding/onboarding.component';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { EmailSendModalComponent } from '../shared/components/email-send-modal/email-send-modal.component';
import { OrderDataExportComponent } from '../features/dashboard/order-data-export/order-data-export.component';
import { SignatureModalComponent } from '../shared/components/signature-modal/signature-modal.component';

type AppView = 'technician-login' | 'dashboard' | 'new-order' | 'edit-order' | 'summary' | 'history';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    TechnicianInfoComponent,
    TechnicianDashboardComponent,
    RepairOrderFormComponent,
    RepairOrderSummaryComponent,
    OrderHistoryComponent,
    OnboardingComponent,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FooterComponent,
    OrderDataExportComponent
  ],
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.scss']
})
export class AppContainerComponent implements OnInit {
  currentView: AppView = 'technician-login';
  currentEditingOrder: RepairOrder | null = null;
  showOnboarding = false;
  exportedOrder: RepairOrder | null = null;

  technicianInfo: TechnicianInfo | null = null;
  repairOrders: RepairOrder[] = [];

  constructor(
    private repairOrderService: RepairOrderService,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.repairOrderService.technicianInfo$.subscribe(info => {
      this.technicianInfo = info;
    });

    this.repairOrderService.repairOrders$.subscribe(orders => {
      this.repairOrders = orders;
    });
  }

  onTechnicianLogin(techInfo: TechnicianInfo): void {
    this.repairOrderService.setTechnicianInfo(techInfo);
    if (!this.localStorageService.hasSeenOnboarding(techInfo.name)) {
      this.showOnboarding = true;
    } else {
      this.currentView = 'dashboard';
    }
  }

  onOnboardingComplete(): void {
    if (this.technicianInfo) {
      this.localStorageService.markOnboardingAsSeen(this.technicianInfo.name);
    }
    this.showOnboarding = false;
    this.currentView = 'dashboard';
  }

  onOnboardingSkip(): void {
    if (this.technicianInfo) {
      this.localStorageService.markOnboardingAsSeen(this.technicianInfo.name);
    }
    this.showOnboarding = false;
    this.currentView = 'dashboard';
  }

  onStartNewOrder(): void {
    this.currentEditingOrder = null;
    this.currentView = 'new-order';
  }

  onEditOrder(orderId: string): void {
    let orderToEdit: RepairOrder | null = this.repairOrders.find(order => order.id === orderId) || null;
    
    if (!orderToEdit && this.technicianInfo) {
      orderToEdit = this.repairOrderService.getOrderFromHistory(orderId, this.technicianInfo.name);
    }
    
    if (orderToEdit) {
      this.currentEditingOrder = orderToEdit;
      this.currentView = 'edit-order';
    }
  }

  onUpdateOrder(order: RepairOrder): void {
    this.repairOrderService.updateRepairOrder(order);
  }

  onDeleteOrder(orderId: string): void {
    this.repairOrderService.deleteRepairOrder(orderId);
  }

  onSaveOrder(order: RepairOrder): void {
    if (this.currentEditingOrder) {
      this.repairOrderService.updateRepairOrder(order);
    } else {
      this.repairOrderService.addRepairOrder(order);
    }
    
    this.currentEditingOrder = null;
    this.currentView = 'dashboard';
  }

  onBackToDashboard(): void {
    this.currentEditingOrder = null;
    this.currentView = 'dashboard';
  }

  onViewSummary(): void {
    this.currentView = 'summary';
  }

  onViewHistory(): void {
    this.currentView = 'history';
  }

  onSendForBilling(ordersToSend?: RepairOrder[]): void {
    const ordersToProcess = ordersToSend || this.repairOrders;
    if (ordersToProcess.length === 0) {
      return;
    }

    const dialogRef = this.dialog.open(EmailSendModalComponent, {
      width: '500px',
      data: {
        ordersCount: ordersToProcess.length,
        recipientEmail: 'facturation@euromaster.com'
      }
    });

    dialogRef.afterClosed().subscribe(isSent => {
      if (isSent) {
        this.repairOrderService.sendOrdersForBilling(ordersToProcess);
        this.currentView = 'dashboard';
      }
    });
  }
  
  onLogout(): void {
    this.repairOrderService.setTechnicianInfo({
      name: '',
      date: new Date().toISOString().split('T')[0]
    });
    this.repairOrderService.clearAllOrders();
    this.currentView = 'technician-login';
  }
  
  onShowHelp(): void {
    this.showOnboarding = true;
  }

  onExportOrder(order: RepairOrder): void {
    this.exportedOrder = order;
  }

  onCloseExport(): void {
    this.exportedOrder = null;
  }

  onAddSignatureFromExport(orderId: string): void {
    const order = this.repairOrders.find(o => o.id === orderId) || this.repairOrderService.getOrderFromHistory(orderId, this.technicianInfo!.name);
    if (order) {
        this.onCloseExport();
        const dialogRef = this.dialog.open(SignatureModalComponent, {
          width: '500px',
          data: {
            title: `Signature - ${order.driver.firstName} ${order.driver.lastName}`,
            initialSignature: order.signature
          }
        });

        dialogRef.afterClosed().subscribe(signatureData => {
          if (signatureData) {
            const updatedOrder = { ...order, signature: signatureData };
            this.repairOrderService.updateRepairOrder(updatedOrder);
          }
        });
    }
  }
}
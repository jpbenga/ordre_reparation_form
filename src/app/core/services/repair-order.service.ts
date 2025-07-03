import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RepairOrder, TechnicianInfo } from '../../shared/models/repair-order.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RepairOrderService {
  private repairOrdersSubject = new BehaviorSubject<RepairOrder[]>([]);
  private technicianInfoSubject = new BehaviorSubject<TechnicianInfo | null>(null);

  repairOrders$ = this.repairOrdersSubject.asObservable();
  technicianInfo$ = this.technicianInfoSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {}

  setTechnicianInfo(info: TechnicianInfo): void {
    this.technicianInfoSubject.next(info);
  }

  getTechnicianInfo(): TechnicianInfo | null {
    return this.technicianInfoSubject.value;
  }

  addRepairOrder(order: RepairOrder): void {
    const currentOrders = this.repairOrdersSubject.value;
    this.repairOrdersSubject.next([...currentOrders, order]);
  }

  updateRepairOrder(updatedOrder: RepairOrder): void {
    const currentOrders = this.repairOrdersSubject.value;
    const index = currentOrders.findIndex(order => order.id === updatedOrder.id);
    
    if (index !== -1) {
      currentOrders[index] = updatedOrder;
      this.repairOrdersSubject.next([...currentOrders]);
    }
    
    const technicianInfo = this.getTechnicianInfo();
    if (technicianInfo) {
      this.localStorageService.addOrderToHistory(updatedOrder, technicianInfo.name);
    }
  }

  deleteRepairOrder(orderId: string): void {
    const currentOrders = this.repairOrdersSubject.value;
    this.repairOrdersSubject.next(currentOrders.filter(order => order.id !== orderId));
  }

  sendOrdersForBilling(ordersToSend?: RepairOrder[]): void {
    const technicianInfo = this.getTechnicianInfo();
    if (!technicianInfo) return;

    const ordersToProcess = ordersToSend || this.repairOrdersSubject.value;

    ordersToProcess.forEach(order => {
      this.localStorageService.addOrderToHistory(order, technicianInfo.name);
    });

    if (!ordersToSend) {
      this.repairOrdersSubject.next([]);
    } else {
        const remainingOrders = this.repairOrdersSubject.value.filter(
            order => !ordersToSend.some(sentOrder => sentOrder.id === order.id)
        );
        this.repairOrdersSubject.next(remainingOrders);
    }
  }
  
  addRepairOrderToHistoryOnly(order: RepairOrder): void {
    const technicianInfo = this.getTechnicianInfo();
    if (technicianInfo) {
      this.localStorageService.addOrderToHistory(order, technicianInfo.name);
    }
  }

  clearAllOrders(): void {
    this.repairOrdersSubject.next([]);
  }

  getRepairOrders(): RepairOrder[] {
    return this.repairOrdersSubject.value;
  }

  getOrderHistory(technicianName: string): RepairOrder[] {
    return this.localStorageService.getOrdersFromLocalStorage(technicianName);
  }

  getOrderFromHistory(orderId: string, technicianName: string): RepairOrder | null {
    const historicalOrders = this.localStorageService.getOrdersFromLocalStorage(technicianName);
    return historicalOrders.find(order => order.id === orderId) || null;
  }
}
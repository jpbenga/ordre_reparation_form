import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RepairOrder, TechnicianInfo } from '../../shared/models/repair-order.model';

@Injectable({
  providedIn: 'root'
})
export class RepairOrderService {
  private repairOrdersSubject = new BehaviorSubject<RepairOrder[]>([]);
  private technicianInfoSubject = new BehaviorSubject<TechnicianInfo | null>(null);

  repairOrders$ = this.repairOrdersSubject.asObservable();
  technicianInfo$ = this.technicianInfoSubject.asObservable();

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
  }

  deleteRepairOrder(orderId: string): void {
    const currentOrders = this.repairOrdersSubject.value;
    this.repairOrdersSubject.next(currentOrders.filter(order => order.id !== orderId));
  }

  clearAllOrders(): void {
    this.repairOrdersSubject.next([]);
  }

  getRepairOrders(): RepairOrder[] {
    return this.repairOrdersSubject.value;
  }
}
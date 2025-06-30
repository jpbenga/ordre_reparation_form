import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
    
    // Charger les ordres depuis localStorage quand technicien se connecte
    // (Dans le prototype c'était commenté, mais on peut l'activer si besoin)
    // const savedOrders = this.localStorageService.getOrdersFromLocalStorage(info.name);
    // On ne charge pas automatiquement les ordres historiques dans la liste active
    // mais on pourrait le faire si nécessaire
  }

  getTechnicianInfo(): TechnicianInfo | null {
    return this.technicianInfoSubject.value;
  }

  addRepairOrder(order: RepairOrder): void {
    const currentOrders = this.repairOrdersSubject.value;
    
    // Ajouter à la liste active
    this.repairOrdersSubject.next([...currentOrders, order]);
    
    // Sauvegarder l'ordre dans le localStorage
    const technicianInfo = this.getTechnicianInfo();
    if (technicianInfo) {
      this.localStorageService.addOrderToHistory(order, technicianInfo.name);
    }
  }

  updateRepairOrder(updatedOrder: RepairOrder): void {
    const currentOrders = this.repairOrdersSubject.value;
    const index = currentOrders.findIndex(order => order.id === updatedOrder.id);
    
    if (index !== -1) {
      // Mettre à jour dans la liste active
      currentOrders[index] = updatedOrder;
      this.repairOrdersSubject.next([...currentOrders]);
    } else {
      // Si l'ordre n'est pas dans la liste active, l'ajouter
      this.repairOrdersSubject.next([...currentOrders, updatedOrder]);
    }
    
    // Sauvegarder l'ordre dans le localStorage
    const technicianInfo = this.getTechnicianInfo();
    if (technicianInfo) {
      this.localStorageService.addOrderToHistory(updatedOrder, technicianInfo.name);
    }
  }

  deleteRepairOrder(orderId: string): void {
    const currentOrders = this.repairOrdersSubject.value;
    this.repairOrdersSubject.next(currentOrders.filter(order => order.id !== orderId));
  }

  // Envoi pour facturation : comme dans le prototype
  sendOrdersForBilling(ordersToSend?: RepairOrder[]): void {
    const technicianInfo = this.getTechnicianInfo();
    if (!technicianInfo) return;

    const currentOrders = this.repairOrdersSubject.value;
    const ordersToProcess = ordersToSend || currentOrders;

    // Si on envoie tous les ordres actifs
    if (!ordersToSend || ordersToSend === currentOrders) {
      // Sauvegarder tous les ordres dans l'historique avant de les supprimer
      currentOrders.forEach(order => {
        this.localStorageService.addOrderToHistory(order, technicianInfo.name);
      });
      
      // Vider la liste active
      this.repairOrdersSubject.next([]);
    } else {
      // Sauvegarder les ordres sélectionnés dans l'historique
      ordersToProcess.forEach(order => {
        this.localStorageService.addOrderToHistory(order, technicianInfo.name);
      });
    }
  }

  clearAllOrders(): void {
    this.repairOrdersSubject.next([]);
  }

  getRepairOrders(): RepairOrder[] {
    return this.repairOrdersSubject.value;
  }

  // Nouvelle méthode pour récupérer l'historique
  getOrderHistory(technicianName: string): RepairOrder[] {
    return this.localStorageService.getOrdersFromLocalStorage(technicianName);
  }

  // Nouvelle méthode pour éditer un ordre depuis l'historique
  getOrderFromHistory(orderId: string, technicianName: string): RepairOrder | null {
    const historicalOrders = this.localStorageService.getOrdersFromLocalStorage(technicianName);
    return historicalOrders.find(order => order.id === orderId) || null;
  }
}
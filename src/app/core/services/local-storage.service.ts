import { Injectable } from '@angular/core';
import { RepairOrder } from '../../shared/models/repair-order.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveOrdersToLocalStorage(orders: RepairOrder[], technicianName: string): void {
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 1);
    
    const storageData = {
      orders,
      expiration: expirationDate.getTime(),
      technicianName
    };
    
    localStorage.setItem('repairOrdersHistory', JSON.stringify(storageData));
  }

  getOrdersFromLocalStorage(technicianName: string): RepairOrder[] {
    const storageData = localStorage.getItem('repairOrdersHistory');
    
    if (!storageData) {
      return [];
    }

    try {
      const data = JSON.parse(storageData);
      
      if (data.expiration && new Date().getTime() > data.expiration) {
        localStorage.removeItem('repairOrdersHistory');
        return [];
      }

      if (data.technicianName !== technicianName) {
        return [];
      }

      return data.orders || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      return [];
    }
  }

  addOrderToHistory(order: RepairOrder, technicianName: string): void {
    const existingOrders = this.getOrdersFromLocalStorage(technicianName);
    
    const orderIndex = existingOrders.findIndex(o => o.id === order.id);
    
    if (orderIndex >= 0) {
      existingOrders[orderIndex] = order;
    } else {
      existingOrders.push(order);
    }

    this.saveOrdersToLocalStorage(existingOrders, technicianName);
  }

  removeOrderFromHistory(orderId: string, technicianName: string): void {
    const existingOrders = this.getOrdersFromLocalStorage(technicianName);
    const updatedOrders = existingOrders.filter(order => order.id !== orderId);
    this.saveOrdersToLocalStorage(updatedOrders, technicianName);
  }

  public hasSeenOnboarding(technicianName: string): boolean {
    const data = localStorage.getItem('onboardingStatus');
    if (!data) {
      return false;
    }
    try {
      const parsedData = JSON.parse(data);
      return parsedData[technicianName] === true;
    } catch (error) {
      return false;
    }
  }

  public markOnboardingAsSeen(technicianName: string): void {
    let data: { [key: string]: boolean } = {};
    try {
      const existingData = localStorage.getItem('onboardingStatus');
      if (existingData) {
        data = JSON.parse(existingData);
      }
    } catch (error) {
    }
    data[technicianName] = true;
    localStorage.setItem('onboardingStatus', JSON.stringify(data));
  }
}
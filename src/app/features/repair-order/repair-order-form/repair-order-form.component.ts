import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepairOrder, TechnicianInfo } from '../../../shared/models/repair-order.model';
import { ProgressBarComponent } from '../../../shared/components/progress-bar/progress-bar.component';
import { DriverInfoComponent } from '../driver-info/driver-info.component';
import { VehicleInfoComponent } from '../vehicle-info/vehicle-info.component';
import { VehicleConditionComponent } from '../vehicle-condition/vehicle-condition.component';
import { TireSelectionComponent } from '../tire-selection/tire-selection.component';
import { StorageComponent } from '../storage/storage.component';

@Component({
  selector: 'app-repair-order-form',
  standalone: true,
  imports: [
    CommonModule,
    ProgressBarComponent,
    DriverInfoComponent,
    VehicleInfoComponent,
    VehicleConditionComponent,
    TireSelectionComponent,
    StorageComponent
  ],
  templateUrl: './repair-order-form.component.html',
  styleUrl: './repair-order-form.component.scss'
})
export class RepairOrderFormComponent implements OnInit {
  @Input() technicianInfo!: TechnicianInfo;
  @Input() editingOrder: RepairOrder | null = null;
  
  @Output() backToDashboard = new EventEmitter<void>();
  @Output() saveOrder = new EventEmitter<RepairOrder>();

  currentStep = 1;
  totalSteps = 5;

  formData = {
    driver: {
      firstName: '',
      lastName: '',
      company: ''
    },
    vehicle: {
      registration: '',
      brand: '',
      mileage: '',
      model: ''
    },
    condition: {
      frontLeft: '',
      frontRight: '',
      rearLeft: '',
      rearRight: ''
    },
    tires: {
      front: '',
      rear: '',
      frontBrand: '',
      rearBrand: '',
      frontModel: '',
      rearModel: '',
      frontDimension: '',
      rearDimension: '',
      frontIndex: '',
      rearIndex: '',
      frontTireCount: '',
      rearTireCount: '',
      tireInsurance: false,
      roadAssistance: false,
      valveReuse: false,
      valveMaintenance: false,
      balancingType: false,
      geometryType: false,
      contReg: false,
      wasteAgreementCount: '',
      laborCount: '',
      valveCount: '',
      nitrogenCount: '',
      punctureRepairCount: '',
      mountingCount: '',
      rotationCount: ''
    },
    storage: {
      outbound: {
        count: '',
        wheel: false,
        hubcap: false,
        screws: false,
        location: '',
        profile: '',
        dimension: '',
        brand: '',
        tireProfile: '',
        isBackAtCenter: false
      },
      inbound: {
        count: '',
        wheel: false,
        hubcap: false,
        screws: false,
        location: '',
        profile: '',
        dimension: '',
        brand: '',
        tireProfile: '',
        isBackAtCenter: false
      }
    }
  };

  ngOnInit(): void {
    if (this.editingOrder) {
      this.loadOrderData(this.editingOrder);
    }
  }

  loadOrderData(order: RepairOrder): void {
    this.formData = {
      driver: { ...order.driver },
      vehicle: { ...order.vehicle },
      condition: { ...order.condition },
      tires: { ...order.tires },
      storage: { ...order.storage }
    };
  }

  onBackToDashboard(): void {
    this.backToDashboard.emit();
  }

  onNextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  onPreviousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onFinishOrder(): void {
    const repairOrder: RepairOrder = {
      id: this.editingOrder?.id || Date.now().toString(),
      date: new Date().toISOString(),
      technicianName: this.technicianInfo.name,
      ...this.formData
    };

    this.saveOrder.emit(repairOrder);
  }

  onDriverDataChange(data: any): void {
    this.formData.driver = { ...this.formData.driver, ...data };
  }

  onVehicleDataChange(data: any): void {
    this.formData.vehicle = { ...this.formData.vehicle, ...data };
  }

  onConditionDataChange(data: any): void {
    this.formData.condition = { ...this.formData.condition, ...data };
  }

  onTireDataChange(data: any): void {
    this.formData.tires = { ...this.formData.tires, ...data };
  }

  onStorageDataChange(data: any): void {
    this.formData.storage = { ...this.formData.storage, ...data };
  }
}
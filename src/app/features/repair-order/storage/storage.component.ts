import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageInfo } from '../../../shared/models/repair-order.model';
import { CheckboxComponent } from '../../../shared/components/checkbox/checkbox.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-storage',
  standalone: true,
  imports: [
    CommonModule,
    CheckboxComponent,
    InputFieldComponent,
    ButtonComponent
  ],
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.scss'
})
export class StorageComponent {
  @Input() data: StorageInfo = {
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
  };
  
  @Output() dataChange = new EventEmitter<StorageInfo>();
  @Output() previousStep = new EventEmitter<void>();
  @Output() finishOrder = new EventEmitter<void>();

  errors = {
    inboundBrand: '',
    inboundTireProfile: '',
    inboundDimension: ''
  };

  get completeData(): StorageInfo {
    return {
      outbound: {
        count: this.data.outbound?.count || '',
        wheel: this.data.outbound?.wheel || false,
        hubcap: this.data.outbound?.hubcap || false,
        screws: this.data.outbound?.screws || false,
        location: this.data.outbound?.location || '',
        profile: this.data.outbound?.profile || '',
        dimension: this.data.outbound?.dimension || '',
        brand: this.data.outbound?.brand || '',
        tireProfile: this.data.outbound?.tireProfile || '',
        isBackAtCenter: this.data.outbound?.isBackAtCenter || false
      },
      inbound: {
        count: this.data.inbound?.count || '',
        wheel: this.data.inbound?.wheel || false,
        hubcap: this.data.inbound?.hubcap || false,
        screws: this.data.inbound?.screws || false,
        location: this.data.inbound?.location || '',
        profile: this.data.inbound?.profile || '',
        dimension: this.data.inbound?.dimension || '',
        brand: this.data.inbound?.brand || '',
        tireProfile: this.data.inbound?.tireProfile || '',
        isBackAtCenter: this.data.inbound?.isBackAtCenter || false
      }
    };
  }

  updateOutboundData(outboundData: any): void {
    const newData = {
      ...this.data,
      outbound: {
        ...this.completeData.outbound,
        ...outboundData
      }
    };
    this.dataChange.emit(newData);
  }

  updateInboundData(inboundData: any): void {
    const newData = {
      ...this.data,
      inbound: {
        ...this.completeData.inbound,
        ...inboundData
      }
    };
    this.dataChange.emit(newData);
  }

  validate(): boolean {
    this.errors = {
      inboundBrand: '',
      inboundTireProfile: '',
      inboundDimension: ''
    };

    if (this.completeData.inbound.count && this.completeData.inbound.count !== '0') {
      if (!this.completeData.inbound.brand) {
        this.errors.inboundBrand = "La marque est requise pour l'entrée stock";
      }
      if (!this.completeData.inbound.tireProfile) {
        this.errors.inboundTireProfile = "Le profil est requis pour l'entrée stock";
      }
      if (!this.completeData.inbound.dimension) {
        this.errors.inboundDimension = "La dimension est requise pour l'entrée stock";
      }
    }

    return !Object.values(this.errors).some(error => error);
  }

  onPrevious(): void {
    this.previousStep.emit();
  }

  onFinish(): void {
    if (this.validate()) {
      this.finishOrder.emit();
    }
  }
}
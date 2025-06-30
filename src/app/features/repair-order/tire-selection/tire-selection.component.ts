import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TireInfo } from '../../../shared/models/repair-order.model';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CheckboxComponent } from '../../../shared/components/checkbox/checkbox.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';

@Component({
  selector: 'app-tire-selection',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    CheckboxComponent,
    InputFieldComponent
  ],
  templateUrl: './tire-selection.component.html',
  styleUrl: './tire-selection.component.scss'
})
export class TireSelectionComponent {
  @Input() data: TireInfo = {
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
  };
  
  @Output() dataChange = new EventEmitter<TireInfo>();
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  showServices = false;
  showOptions = false;

  errors = {
    frontBrand: '',
    rearBrand: '',
    frontModel: '',
    rearModel: '',
    frontDimension: '',
    rearDimension: '',
    frontTireCount: '',
    rearTireCount: '',
    laborCount: '',
    valveCount: ''
  };

  onFieldChange(field: keyof TireInfo, value: string | boolean): void {
    this.data = { ...this.data, [field]: value };
    this.dataChange.emit(this.data);
    
    if (typeof value === 'string' && this.errors[field as keyof typeof this.errors] !== undefined) {
      this.errors[field as keyof typeof this.errors] = '';
    }
  }

  copyFrontBrandToRear(): void {
    this.onFieldChange('rearBrand', this.data.frontBrand);
  }

  copyFrontModelToRear(): void {
    this.onFieldChange('rearModel', this.data.frontModel);
  }

  copyFrontDimensionToRear(): void {
    this.onFieldChange('rearDimension', this.data.frontDimension);
  }

  copyFrontIndexToRear(): void {
    this.onFieldChange('rearIndex', this.data.frontIndex);
  }

  copyAllFrontToRear(): void {
    this.data = {
      ...this.data,
      rear: this.data.front,
      rearBrand: this.data.frontBrand,
      rearModel: this.data.frontModel,
      rearDimension: this.data.frontDimension,
      rearIndex: this.data.frontIndex,
      rearTireCount: this.data.frontTireCount
    };
    this.dataChange.emit(this.data);
  }

  toggleServices(): void {
    this.showServices = !this.showServices;
  }

  toggleOptions(): void {
    this.showOptions = !this.showOptions;
  }

  validate(): boolean {
    this.errors = {
      frontBrand: '',
      rearBrand: '',
      frontModel: '',
      rearModel: '',
      frontDimension: '',
      rearDimension: '',
      frontTireCount: '',
      rearTireCount: '',
      laborCount: '',
      valveCount: ''
    };

    if (this.data.frontTireCount && this.data.frontTireCount !== '0') {
      if (!this.data.frontBrand) {
        this.errors.frontBrand = 'La marque est requise';
      }
      if (!this.data.frontModel) {
        this.errors.frontModel = 'Le profil est requis';
      }
      if (!this.data.frontDimension) {
        this.errors.frontDimension = 'La dimension est requise';
      }
    }

    if (this.data.rearTireCount && this.data.rearTireCount !== '0') {
      if (!this.data.rearBrand) {
        this.errors.rearBrand = 'La marque est requise';
      }
      if (!this.data.rearModel) {
        this.errors.rearModel = 'Le profil est requis';
      }
      if (!this.data.rearDimension) {
        this.errors.rearDimension = 'La dimension est requise';
      }
    }

    if (!this.data.frontTireCount && !this.data.rearTireCount) {
      this.errors.frontTireCount = 'Le nombre de pneus est requis';
      this.errors.rearTireCount = 'Le nombre de pneus est requis';
    }

    if (!this.data.laborCount) {
      this.errors.laborCount = 'Le forfait MO est requis';
    }

    if (!this.data.valveCount) {
      this.errors.valveCount = 'La valve est requise';
    }

    return !Object.values(this.errors).some(error => error);
  }

  onNext(): void {
    if (this.validate()) {
      this.nextStep.emit();
    }
  }

  onPrevious(): void {
    this.previousStep.emit();
  }
}
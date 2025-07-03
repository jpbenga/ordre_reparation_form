import { Component, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef } from '@angular/core';
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
  styleUrls: ['./tire-selection.component.scss']
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

  @ViewChildren(InputFieldComponent) inputFields!: QueryList<InputFieldComponent>;
  @ViewChildren('serviceInput') serviceInputs!: QueryList<ElementRef<HTMLInputElement>>;


  showServices = false;
  showOptions = false;

  errors: { [key: string]: string } = {
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
    const newErrors: { [key: string]: string } = {};

    if (this.data.frontTireCount && this.data.frontTireCount !== '0') {
      if (!this.data.frontBrand) newErrors['frontBrand'] = 'La marque est requise';
      if (!this.data.frontModel) newErrors['frontModel'] = 'Le profil est requis';
      if (!this.data.frontDimension) newErrors['frontDimension'] = 'La dimension est requise';
    }

    if (this.data.rearTireCount && this.data.rearTireCount !== '0') {
      if (!this.data.rearBrand) newErrors['rearBrand'] = 'La marque est requise';
      if (!this.data.rearModel) newErrors['rearModel'] = 'Le profil est requis';
      if (!this.data.rearDimension) newErrors['rearDimension'] = 'La dimension est requise';
    }

    if (!this.data.frontTireCount && !this.data.rearTireCount) {
      newErrors['frontTireCount'] = 'Le nombre de pneus est requis';
    }

    if (!this.data.laborCount) newErrors['laborCount'] = 'Le forfait MO est requis';
    if (!this.data.valveCount) newErrors['valveCount'] = 'La valve est requise';
    
    this.errors = newErrors;

    if (Object.keys(newErrors).length > 0) {
        if(newErrors['laborCount'] || newErrors['valveCount']) {
            this.showServices = true;
        }
        setTimeout(() => this.focusFirstError(), 0);
        return false;
    }
    
    return true;
  }

  private focusFirstError(): void {
    const errorKeys = Object.keys(this.errors);
    if (errorKeys.length === 0) return;

    const firstErrorKey = errorKeys[0];

    const serviceInput = this.serviceInputs.find(input => input.nativeElement.id === firstErrorKey);
    if (serviceInput) {
        serviceInput.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        serviceInput.nativeElement.focus();
        return;
    }

    const inputField = this.inputFields.find(field => field.label.toLowerCase().replace(/ /g, '') === firstErrorKey.replace(/([A-Z])/g, ' $1').split(' ')[0].toLowerCase());

    if(inputField) {
        inputField.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
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
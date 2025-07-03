export interface DriverInfo {
  firstName: string;
  lastName: string;
  company: string;
}

export interface VehicleInfo {
  registration: string;
  brand: string;
  mileage: string;
  model: string;
}

export interface VehicleCondition {
  frontLeft: string;
  frontRight: string;
  rearLeft: string;
  rearRight: string;
}

export interface TireInfo {
  front: string;
  rear: string;
  frontBrand: string;
  rearBrand: string;
  frontModel: string;
  rearModel: string;
  frontDimension: string;
  rearDimension: string;
  frontIndex: string;
  rearIndex: string;
  frontTireCount: string;
  rearTireCount: string;
  tireInsurance: boolean;
  roadAssistance: boolean;
  valveReuse: boolean;
  valveMaintenance: boolean;
  balancingType: boolean;
  geometryType: boolean;
  contReg: boolean;
  wasteAgreementCount: string;
  laborCount: string;
  valveCount: string;
  nitrogenCount: string;
  punctureRepairCount: string;
  mountingCount: string;
  rotationCount: string;
}

export interface StorageSection {
  count: string;
  wheel: boolean;
  hubcap: boolean;
  screws: boolean;
  location: string;
  profile: string;
  dimension: string;
  brand: string;
  tireProfile: string;
  isBackAtCenter: boolean;
}

export interface StorageInfo {
  outbound: StorageSection;
  inbound: StorageSection;
}

export interface RepairOrder {
  id: string;
  date: string;
  technicianName: string;
  driver: DriverInfo;
  vehicle: VehicleInfo;
  condition: VehicleCondition;
  tires: TireInfo;
  storage: StorageInfo;
  signature?: string;
}

export interface TechnicianInfo {
  name: string;
  date: string;
}
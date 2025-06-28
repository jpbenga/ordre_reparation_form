export interface DriverInfo {
    firstName: string;
    lastName: string;
    company: string;
  }
  
  export interface VehicleInfo {
    registration: string;
    brand: string;
    mileage: string;
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
  }
  
  export interface StorageInfo {
    completeWheel: boolean;
    hubcap: boolean;
    screws: boolean;
    profile: string;
    location: string;
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
  }
  
  export interface TechnicianInfo {
    name: string;
    date: string;
  }
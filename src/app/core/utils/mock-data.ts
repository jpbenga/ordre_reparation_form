import { RepairOrder } from '../../shared/models/repair-order.model';

const generateId = (): string => {
  return Date.now().toString() + Math.floor(Math.random() * 1000).toString();
};

const generateRandomDate = (daysBack = 30): string => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
  return date.toISOString();
};

const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const generateMockOrder = (technicianName: string): RepairOrder => {
  const companies = ['Renault', 'Peugeot', 'Citroën', 'Michelin', 'Total', 'La Poste', 'SNCF', 'EDF', '', ''];
  const firstNames = ['Jean', 'Marie', 'Pierre', 'Sophie', 'Thomas', 'Julie', 'Nicolas', 'Isabelle', 'François', 'Anne'];
  const lastNames = ['Dupont', 'Martin', 'Bernard', 'Petit', 'Durand', 'Leroy', 'Moreau', 'Simon', 'Laurent', 'Lefebvre'];
  const carBrands = ['Renault', 'Peugeot', 'Citroën', 'Volkswagen', 'BMW', 'Audi', 'Mercedes', 'Toyota', 'Ford', 'Opel'];
  const carModels: { [key: string]: string[] } = {
    Renault: ['Clio', 'Megane', 'Captur', 'Kadjar', 'Scenic'],
    Peugeot: ['208', '308', '3008', '508', '2008'],
    Citroën: ['C3', 'C4', 'C5', 'Berlingo', 'DS3'],
    Volkswagen: ['Golf', 'Polo', 'Passat', 'Tiguan', 'T-Roc'],
    BMW: ['Serie 1', 'Serie 3', 'Serie 5', 'X1', 'X3'],
    Audi: ['A1', 'A3', 'A4', 'Q3', 'Q5'],
    Mercedes: ['Classe A', 'Classe C', 'Classe E', 'GLA', 'GLC'],
    Toyota: ['Yaris', 'Corolla', 'RAV4', 'C-HR', 'Prius'],
    Ford: ['Fiesta', 'Focus', 'Kuga', 'Puma', 'Mondeo'],
    Opel: ['Corsa', 'Astra', 'Grandland X', 'Crossland X', 'Insignia']
  };
  const registrations = ['AB-123-CD', 'DE-456-FG', 'HI-789-JK', 'LM-012-NO', 'PQ-345-RS', 'TU-678-VW', 'XY-901-ZA', 'BC-234-DE', 'FG-567-HI', 'JK-890-LM'];
  const carBrand = getRandomItem(carBrands);
  const carModel = getRandomItem(carModels[carBrand] || ['Modèle inconnu']);

  const frontTireCount = Math.floor(Math.random() * 3);
  const rearTireCount = Math.floor(Math.random() * 3);
  const laborCount = Math.max(1, frontTireCount + rearTireCount);
  const valveCount = frontTireCount + rearTireCount;

  return {
    id: generateId(),
    date: generateRandomDate(),
    technicianName: technicianName,
    driver: {
      firstName: getRandomItem(firstNames),
      lastName: getRandomItem(lastNames),
      company: getRandomItem(companies)
    },
    vehicle: {
      registration: getRandomItem(registrations),
      brand: carBrand,
      model: carModel,
      mileage: (Math.floor(Math.random() * 200) + 10) * 1000 + ''
    },
    condition: {
      frontLeft: (Math.random() * 8 + 1).toFixed(1),
      frontRight: (Math.random() * 8 + 1).toFixed(1),
      rearLeft: (Math.random() * 8 + 1).toFixed(1),
      rearRight: (Math.random() * 8 + 1).toFixed(1)
    },
    tires: {
        front: getRandomItem(['summer', 'winter', 'allSeason']),
        rear: getRandomItem(['summer', 'winter', 'allSeason']),
        frontBrand: frontTireCount > 0 ? 'Michelin' : '',
        rearBrand: rearTireCount > 0 ? 'Continental' : '',
        frontModel: frontTireCount > 0 ? 'Primacy 4' : '',
        rearModel: rearTireCount > 0 ? 'EcoContact 6' : '',
        frontDimension: frontTireCount > 0 ? '205/55R16' : '',
        rearDimension: rearTireCount > 0 ? '205/55R16' : '',
        frontIndex: frontTireCount > 0 ? '91V' : '',
        rearIndex: rearTireCount > 0 ? '91V' : '',
        frontTireCount: frontTireCount.toString(),
        rearTireCount: rearTireCount.toString(),
        tireInsurance: Math.random() > 0.5,
        roadAssistance: Math.random() > 0.5,
        valveReuse: Math.random() > 0.5,
        valveMaintenance: Math.random() > 0.5,
        balancingType: Math.random() > 0.5,
        geometryType: Math.random() > 0.5,
        contReg: Math.random() > 0.5,
        wasteAgreementCount: Math.floor(Math.random() * 5).toString(),
        laborCount: laborCount.toString(),
        valveCount: valveCount.toString(),
        nitrogenCount: Math.floor(Math.random() * 5).toString(),
        punctureRepairCount: Math.floor(Math.random() * 3).toString(),
        mountingCount: Math.floor(Math.random() * 5).toString(),
        rotationCount: Math.floor(Math.random() * 3).toString()
    },
    storage: {
      outbound: {
        count: Math.floor(Math.random() * 5).toString(),
        wheel: Math.random() > 0.5,
        hubcap: Math.random() > 0.5,
        screws: Math.random() > 0.5,
        location: '',
        profile: (Math.random() * 8 + 1).toFixed(1),
        dimension: '205/55R16',
        brand: 'Pirelli',
        tireProfile: 'P-Zero',
        isBackAtCenter: false
      },
      inbound: {
        count: Math.floor(Math.random() * 5).toString(),
        wheel: Math.random() > 0.5,
        hubcap: Math.random() > 0.5,
        screws: Math.random() > 0.5,
        location: '',
        profile: (Math.random() * 8 + 1).toFixed(1),
        dimension: '195/65R15',
        brand: 'Goodyear',
        tireProfile: 'EfficientGrip',
        isBackAtCenter: false
      }
    }
  };
};
import React from 'react';
import { addOrderToHistory } from './localStorage';
// Fonction pour générer un ID aléatoire
const generateId = () => {
  return Date.now().toString() + Math.floor(Math.random() * 1000).toString();
};
// Fonction pour générer une date aléatoire dans les 30 derniers jours
const generateRandomDate = (daysBack = 30) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
  return date.toISOString();
};
// Fonction pour choisir un élément aléatoire dans un tableau
const getRandomItem = array => {
  return array[Math.floor(Math.random() * array.length)];
};
// Fonction pour générer des données d'ordre de réparation fictives
export const generateMockOrder = technicianName => {
  const companies = ['Renault', 'Peugeot', 'Citroën', 'Michelin', 'Total', 'La Poste', 'SNCF', 'EDF', '', ''];
  const firstNames = ['Jean', 'Marie', 'Pierre', 'Sophie', 'Thomas', 'Julie', 'Nicolas', 'Isabelle', 'François', 'Anne'];
  const lastNames = ['Dupont', 'Martin', 'Bernard', 'Petit', 'Durand', 'Leroy', 'Moreau', 'Simon', 'Laurent', 'Lefebvre'];
  const carBrands = ['Renault', 'Peugeot', 'Citroën', 'Volkswagen', 'BMW', 'Audi', 'Mercedes', 'Toyota', 'Ford', 'Opel'];
  const carModels = {
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
  const tireBrands = ['Michelin', 'Continental', 'Goodyear', 'Bridgestone', 'Pirelli', 'Dunlop', 'Hankook', 'Firestone', 'Nokian', 'Uniroyal'];
  const tireProfiles = ['Primacy 4', 'Premium Contact 6', 'Eagle F1', 'Turanza T005', 'P Zero', 'Sport Maxx RT', 'Ventus S1 Evo3', 'Roadhawk', 'WR Snowproof', 'RainSport 5'];
  const tireDimensions = ['195/65R15', '205/55R16', '225/45R17', '225/40R18', '235/35R19', '185/65R15', '215/60R16', '215/50R17', '245/45R18', '255/35R19'];
  const tireIndices = ['91H', '91V', '94W', '95Y', '88T', '91T', '94H', '98V', '100W', '102Y'];
  const locations = ['Rack A-01', 'Rack A-02', 'Rack B-01', 'Rack B-02', 'Rack C-01', 'Rack C-02', 'Rack D-01', 'Rack D-02', 'Rack E-01', 'Rack E-02'];
  // Générer une marque de voiture aléatoire
  const carBrand = getRandomItem(carBrands);
  // Générer un modèle correspondant à la marque
  const carModel = getRandomItem(carModels[carBrand] || ['Modèle inconnu']);
  // Générer des valeurs aléatoires pour les sculptures des pneus
  const frontLeft = (Math.random() * 8 + 1).toFixed(1);
  const frontRight = (Math.random() * 8 + 1).toFixed(1);
  const rearLeft = (Math.random() * 8 + 1).toFixed(1);
  const rearRight = (Math.random() * 8 + 1).toFixed(1);
  // Générer des valeurs aléatoires pour les nombres de pneus et forfaits
  const frontTireCount = Math.floor(Math.random() * 3);
  const rearTireCount = Math.floor(Math.random() * 3);
  const laborCount = Math.max(1, frontTireCount + rearTireCount);
  const valveCount = frontTireCount + rearTireCount;
  // Générer des valeurs booléennes aléatoires
  const getRandomBoolean = () => Math.random() > 0.5;
  // Générer des valeurs aléatoires pour le stockage
  const outboundCount = Math.floor(Math.random() * 5);
  const inboundCount = Math.floor(Math.random() * 5);
  const outboundIsBackAtCenter = getRandomBoolean();
  const inboundIsBackAtCenter = getRandomBoolean();
  // Créer l'ordre de réparation fictif
  const mockOrder = {
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
      frontLeft,
      frontRight,
      rearLeft,
      rearRight
    },
    tires: {
      front: getRandomItem(['summer', 'winter', 'allSeason']),
      rear: getRandomItem(['summer', 'winter', 'allSeason']),
      frontBrand: frontTireCount > 0 ? getRandomItem(tireBrands) : '',
      rearBrand: rearTireCount > 0 ? getRandomItem(tireBrands) : '',
      frontModel: frontTireCount > 0 ? getRandomItem(tireProfiles) : '',
      rearModel: rearTireCount > 0 ? getRandomItem(tireProfiles) : '',
      frontDimension: frontTireCount > 0 ? getRandomItem(tireDimensions) : '',
      rearDimension: rearTireCount > 0 ? getRandomItem(tireDimensions) : '',
      frontIndex: frontTireCount > 0 ? getRandomItem(tireIndices) : '',
      rearIndex: rearTireCount > 0 ? getRandomItem(tireIndices) : '',
      frontTireCount: frontTireCount + '',
      rearTireCount: rearTireCount + '',
      tireInsurance: getRandomBoolean(),
      roadAssistance: getRandomBoolean(),
      valveReuse: getRandomBoolean(),
      valveMaintenance: getRandomBoolean(),
      balancingType: getRandomBoolean(),
      geometryType: getRandomBoolean(),
      contReg: getRandomBoolean(),
      wasteAgreementCount: Math.floor(Math.random() * 5) + '',
      laborCount: laborCount + '',
      valveCount: valveCount + '',
      nitrogenCount: Math.floor(Math.random() * 5) + '',
      punctureRepairCount: Math.floor(Math.random() * 3) + '',
      mountingCount: Math.floor(Math.random() * 5) + '',
      rotationCount: Math.floor(Math.random() * 3) + ''
    },
    storage: {
      outbound: {
        count: outboundCount + '',
        wheel: getRandomBoolean(),
        hubcap: getRandomBoolean(),
        screws: getRandomBoolean(),
        location: outboundIsBackAtCenter ? getRandomItem(locations) : '',
        profile: (Math.random() * 8 + 1).toFixed(1),
        dimension: getRandomItem(tireDimensions),
        brand: getRandomItem(tireBrands),
        tireProfile: getRandomItem(tireProfiles),
        isBackAtCenter: outboundIsBackAtCenter
      },
      inbound: {
        count: inboundCount + '',
        wheel: getRandomBoolean(),
        hubcap: getRandomBoolean(),
        screws: getRandomBoolean(),
        location: inboundIsBackAtCenter ? getRandomItem(locations) : '',
        profile: (Math.random() * 8 + 1).toFixed(1),
        dimension: getRandomItem(tireDimensions),
        brand: getRandomItem(tireBrands),
        tireProfile: getRandomItem(tireProfiles),
        isBackAtCenter: inboundIsBackAtCenter
      }
    }
  };
  return mockOrder;
};
// Fonction pour générer et sauvegarder plusieurs ordres fictifs
export const generateMockOrders = (technicianName, count = 10) => {
  for (let i = 0; i < count; i++) {
    const mockOrder = generateMockOrder(technicianName);
    addOrderToHistory(mockOrder, technicianName);
  }
};
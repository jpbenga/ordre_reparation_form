import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import { Dropdown } from '../components/Dropdown';
import { Button } from '../components/Button';
interface VehicleData {
  registration: string;
  brand: string;
  mileage: string;
  model: string; // Ajout du champ modèle
}
interface VehicleInfoProps {
  data: VehicleData;
  updateData: (data: Partial<VehicleData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}
export const VehicleInfo = ({
  data,
  updateData,
  onNext,
  onPrevious
}: VehicleInfoProps) => {
  const [errors, setErrors] = useState({
    registration: '',
    brand: '',
    mileage: '',
    model: '' // Ajout de l'erreur pour le modèle
  });
  const carBrands = ['Audi', 'BMW', 'Citroën', 'Dacia', 'Fiat', 'Ford', 'Honda', 'Hyundai', 'Kia', 'Mercedes', 'Nissan', 'Opel', 'Peugeot', 'Renault', 'Seat', 'Skoda', 'Toyota', 'Volkswagen', 'Volvo'];
  const validate = () => {
    const newErrors = {
      registration: '',
      brand: '',
      mileage: '',
      model: ''
    };
    if (!data.registration.trim()) {
      newErrors.registration = "L'immatriculation est requise";
    }
    if (!data.brand) {
      newErrors.brand = 'La marque est requise';
    }
    if (!data.mileage.trim()) {
      newErrors.mileage = 'Le kilométrage est requis';
    } else if (isNaN(Number(data.mileage))) {
      newErrors.mileage = 'Le kilométrage doit être un nombre';
    }
    // Validation du modèle
    if (!data.model || !data.model.trim()) {
      newErrors.model = 'Le modèle est requis';
    }
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };
  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };
  return <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-[#333333] mb-6">
        Informations du véhicule
      </h2>
      <InputField label="Immatriculation" id="registration" value={data.registration} onChange={value => updateData({
      registration: value
    })} placeholder="AB-123-CD" required error={errors.registration} />
      <Dropdown label="Marque" id="brand" value={data.brand} onChange={value => updateData({
      brand: value
    })} options={carBrands} required error={errors.brand} />
      {/* Ajout du champ modèle */}
      <InputField label="Modèle" id="model" value={data.model || ''} onChange={value => updateData({
      model: value
    })} placeholder="Ex: Clio, Golf, 308..." required error={errors.model} />
      <InputField label="Kilométrage" id="mileage" value={data.mileage} onChange={value => updateData({
      mileage: value
    })} placeholder="Entrez le kilométrage" type="number" required error={errors.mileage} />
      <div className="mt-8 flex justify-between">
        <Button onClick={onPrevious} variant="secondary">
          Précédent
        </Button>
        <Button onClick={handleNext}>Suivant</Button>
      </div>
    </div>;
};
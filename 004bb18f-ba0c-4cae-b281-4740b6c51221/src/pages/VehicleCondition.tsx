import React, { useState } from 'react';
import { CarChassis } from '../components/CarChassis';
import { Button } from '../components/Button';
interface VehicleConditionData {
  frontLeft: string;
  frontRight: string;
  rearLeft: string;
  rearRight: string;
}
interface VehicleConditionProps {
  data: VehicleConditionData;
  updateData: (data: Partial<VehicleConditionData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}
export const VehicleCondition = ({
  data,
  updateData,
  onNext,
  onPrevious
}: VehicleConditionProps) => {
  const [errors, setErrors] = useState({
    frontLeft: '',
    frontRight: '',
    rearLeft: '',
    rearRight: ''
  });
  const handleChange = (position: keyof VehicleConditionData, value: string) => {
    updateData({
      [position]: value
    });
  };
  const validate = () => {
    const newErrors = {
      frontLeft: '',
      frontRight: '',
      rearLeft: '',
      rearRight: ''
    };
    if (!data.frontLeft) {
      newErrors.frontLeft = 'Veuillez indiquer les mm restants';
    }
    if (!data.frontRight) {
      newErrors.frontRight = 'Veuillez indiquer les mm restants';
    }
    if (!data.rearLeft) {
      newErrors.rearLeft = 'Veuillez indiquer les mm restants';
    }
    if (!data.rearRight) {
      newErrors.rearRight = 'Veuillez indiquer les mm restants';
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
        État du véhicule
      </h2>
      <p className="text-gray-600 mb-4">
        Veuillez indiquer les millimètres restants sur les sculptures pour
        chaque pneu.
      </p>
      <CarChassis values={data} onChange={handleChange} />
      {/* Affichage des erreurs */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {errors.frontLeft && <p className="text-sm text-red-500">AVG: {errors.frontLeft}</p>}
        {errors.frontRight && <p className="text-sm text-red-500">AVD: {errors.frontRight}</p>}
        {errors.rearLeft && <p className="text-sm text-red-500">ARG: {errors.rearLeft}</p>}
        {errors.rearRight && <p className="text-sm text-red-500">ARD: {errors.rearRight}</p>}
      </div>
      <div className="mt-8 flex justify-between">
        <Button onClick={onPrevious} variant="secondary">
          Précédent
        </Button>
        <Button onClick={handleNext}>Suivant</Button>
      </div>
    </div>;
};
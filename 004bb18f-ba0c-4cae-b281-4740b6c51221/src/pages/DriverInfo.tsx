import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
interface DriverData {
  firstName: string;
  lastName: string;
  company: string;
}
interface DriverInfoProps {
  data: DriverData;
  updateData: (data: Partial<DriverData>) => void;
  onNext: () => void;
}
export const DriverInfo = ({
  data,
  updateData,
  onNext
}: DriverInfoProps) => {
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    company: ''
  });
  const validate = () => {
    const newErrors = {
      firstName: '',
      lastName: '',
      company: ''
    };
    if (!data.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    if (!data.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    if (!data.company.trim()) {
      newErrors.company = 'La société est requise';
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
        Informations du conducteur
      </h2>
      <InputField label="Nom" id="lastName" value={data.lastName} onChange={value => updateData({
      lastName: value
    })} placeholder="Entrez le nom" required error={errors.lastName} />
      <InputField label="Prénom" id="firstName" value={data.firstName} onChange={value => updateData({
      firstName: value
    })} placeholder="Entrez le prénom" required error={errors.firstName} />
      <InputField label="Société" id="company" value={data.company} onChange={value => updateData({
      company: value
    })} placeholder="Entrez le nom de la société" required error={errors.company} />
      <div className="mt-8 flex justify-end">
        <Button onClick={handleNext}>Suivant</Button>
      </div>
    </div>;
};
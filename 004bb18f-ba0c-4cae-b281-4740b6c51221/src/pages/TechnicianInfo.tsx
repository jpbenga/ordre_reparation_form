import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
interface TechnicianInfoProps {
  onSubmit: (data: {
    name: string;
    date: string;
  }) => void;
}
export const TechnicianInfo = ({
  onSubmit
}: TechnicianInfoProps) => {
  const [techData, setTechData] = useState({
    name: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState({
    name: ''
  });
  const validate = () => {
    const newErrors = {
      name: ''
    };
    if (!techData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };
  const handleSubmit = () => {
    if (validate()) {
      onSubmit(techData);
    }
  };
  return <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-[#333333] mb-6">
        Identification du technicien
      </h2>
      <div className="bg-blue-50 p-4 rounded-lg mb-6 border-l-4 border-[#0054A4]">
        <p className="text-sm text-gray-700">
          Veuillez vous identifier pour commencer à saisir des ordres de
          réparation. Tous les ordres seront associés à votre nom.
        </p>
      </div>
      <InputField label="Nom du technicien" id="techName" value={techData.name} onChange={value => setTechData({
      ...techData,
      name: value
    })} placeholder="Entrez votre nom" required error={errors.name} />
      <InputField label="Date d'intervention" id="techDate" value={techData.date} onChange={value => setTechData({
      ...techData,
      date: value
    })} type="date" />
      <div className="mt-8 flex justify-end">
        <Button onClick={handleSubmit}>Commencer</Button>
      </div>
    </div>;
};
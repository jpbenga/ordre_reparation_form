import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { InputField } from '../components/InputField';
import { ChevronDownIcon, ChevronUpIcon, CopyIcon } from 'lucide-react';
interface TireData {
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
  // Propriétés pour les forfaits
  laborCount: string;
  valveCount: string;
  nitrogenCount: string;
  punctureRepairCount: string;
  mountingCount: string;
  rotationCount: string;
}
interface TireSelectionProps {
  data: TireData;
  updateData: (data: Partial<TireData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}
export const TireSelection = ({
  data,
  updateData,
  onNext,
  onPrevious
}: TireSelectionProps) => {
  // États pour contrôler l'affichage des sections dépliables
  const [showServices, setShowServices] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [errors, setErrors] = useState({
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
  });
  // Initialiser les données manquantes avec des valeurs par défaut
  const completeData = {
    front: data.front || '',
    rear: data.rear || '',
    frontBrand: data.frontBrand || '',
    rearBrand: data.rearBrand || '',
    frontModel: data.frontModel || '',
    rearModel: data.rearModel || '',
    frontDimension: data.frontDimension || '',
    rearDimension: data.rearDimension || '',
    frontIndex: data.frontIndex || '',
    rearIndex: data.rearIndex || '',
    frontTireCount: data.frontTireCount || '',
    rearTireCount: data.rearTireCount || '',
    tireInsurance: data.tireInsurance || false,
    roadAssistance: data.roadAssistance || false,
    valveReuse: data.valveReuse || false,
    valveMaintenance: data.valveMaintenance || false,
    balancingType: data.balancingType || false,
    geometryType: data.geometryType || false,
    contReg: data.contReg || false,
    wasteAgreementCount: data.wasteAgreementCount || '',
    // Initialisation des propriétés pour les forfaits
    laborCount: data.laborCount || '',
    valveCount: data.valveCount || '',
    nitrogenCount: data.nitrogenCount || '',
    punctureRepairCount: data.punctureRepairCount || '',
    mountingCount: data.mountingCount || '',
    rotationCount: data.rotationCount || ''
  };
  // Fonctions pour copier les données du pneu avant vers l'arrière
  const copyFrontBrandToRear = () => {
    updateData({
      rearBrand: completeData.frontBrand
    });
  };
  const copyFrontModelToRear = () => {
    updateData({
      rearModel: completeData.frontModel
    });
  };
  const copyFrontDimensionToRear = () => {
    updateData({
      rearDimension: completeData.frontDimension
    });
  };
  const copyFrontIndexToRear = () => {
    updateData({
      rearIndex: completeData.frontIndex
    });
  };
  // Fonction pour copier toutes les données du pneu avant vers l'arrière
  const copyAllFrontToRear = () => {
    updateData({
      rear: completeData.front,
      rearBrand: completeData.frontBrand,
      rearModel: completeData.frontModel,
      rearDimension: completeData.frontDimension,
      rearIndex: completeData.frontIndex,
      rearTireCount: completeData.frontTireCount
    });
  };
  // Validation des champs obligatoires
  const validate = () => {
    const newErrors = {
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
    // Validation des pneus avant
    if (completeData.frontTireCount && completeData.frontTireCount !== '0') {
      if (!completeData.frontBrand) {
        newErrors.frontBrand = 'La marque est requise';
      }
      if (!completeData.frontModel) {
        newErrors.frontModel = 'Le profil est requis';
      }
      if (!completeData.frontDimension) {
        newErrors.frontDimension = 'La dimension est requise';
      }
    }
    // Validation des pneus arrière
    if (completeData.rearTireCount && completeData.rearTireCount !== '0') {
      if (!completeData.rearBrand) {
        newErrors.rearBrand = 'La marque est requise';
      }
      if (!completeData.rearModel) {
        newErrors.rearModel = 'Le profil est requis';
      }
      if (!completeData.rearDimension) {
        newErrors.rearDimension = 'La dimension est requise';
      }
    }
    // Validation du nombre de pneus
    if (!completeData.frontTireCount && !completeData.rearTireCount) {
      newErrors.frontTireCount = 'Le nombre de pneus est requis';
      newErrors.rearTireCount = 'Le nombre de pneus est requis';
    }
    // Validation des forfaits
    if (!completeData.laborCount) {
      newErrors.laborCount = 'Le forfait MO est requis';
    }
    if (!completeData.valveCount) {
      newErrors.valveCount = 'La valve est requise';
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
      <h2 className="text-2xl font-bold text-[#333333] mb-6">PNEUMATIQUES</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        {/* Colonne PNEU AV */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="text-lg font-medium text-[#0054A4] mb-4">PNEU AV</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <Checkbox label="Été" id="frontSummer" checked={completeData.front === 'summer'} onChange={() => updateData({
              front: 'summer'
            })} />
              <Checkbox label="Toutes Saisons" id="frontAllSeason" checked={completeData.front === 'allSeason'} onChange={() => updateData({
              front: 'allSeason'
            })} />
              <Checkbox label="Hiver" id="frontWinter" checked={completeData.front === 'winter'} onChange={() => updateData({
              front: 'winter'
            })} />
            </div>
            <InputField label="Marque" id="frontBrand" value={completeData.frontBrand} onChange={value => updateData({
            frontBrand: value
          })} placeholder="Michelin" required={!!completeData.frontTireCount && completeData.frontTireCount !== '0'} error={errors.frontBrand} />
            <InputField label="Profil" id="frontModel" value={completeData.frontModel} onChange={value => updateData({
            frontModel: value
          })} placeholder="Primacy 5" required={!!completeData.frontTireCount && completeData.frontTireCount !== '0'} error={errors.frontModel} />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Dimension" id="frontDimension" value={completeData.frontDimension} onChange={value => updateData({
              frontDimension: value
            })} placeholder="Ex: 195/60/R16" required={!!completeData.frontTireCount && completeData.frontTireCount !== '0'} error={errors.frontDimension} />
              <InputField label="Indices" id="frontIndex" value={completeData.frontIndex} onChange={value => updateData({
              frontIndex: value
            })} placeholder="Ex: 96H" />
            </div>
            <InputField label="NB de pneus" id="frontTireCount" value={completeData.frontTireCount} onChange={value => updateData({
            frontTireCount: value
          })} placeholder="Nombre" type="number" required error={errors.frontTireCount} />
          </div>
        </div>
        {/* Colonne PNEU AR */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="text-lg font-medium text-[#0054A4] mb-4 flex justify-between items-center">
            <span>PNEU AR</span>
            {(completeData.frontBrand || completeData.frontModel || completeData.frontDimension || completeData.frontIndex) && <button type="button" onClick={copyAllFrontToRear} className="text-xs bg-blue-100 hover:bg-blue-200 text-[#0054A4] px-2 py-1 rounded-md flex items-center" title="Copier toutes les données du pneu avant">
                <CopyIcon className="h-3 w-3 mr-1" /> Copier tout
              </button>}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <Checkbox label="Été" id="rearSummer" checked={completeData.rear === 'summer'} onChange={() => updateData({
              rear: 'summer'
            })} />
              <Checkbox label="Toutes Saisons" id="rearAllSeason" checked={completeData.rear === 'allSeason'} onChange={() => updateData({
              rear: 'allSeason'
            })} />
              <Checkbox label="Hiver" id="rearWinter" checked={completeData.rear === 'winter'} onChange={() => updateData({
              rear: 'winter'
            })} />
            </div>
            <div className="relative">
              <InputField label="Marque" id="rearBrand" value={completeData.rearBrand} onChange={value => updateData({
              rearBrand: value
            })} placeholder="Michelin" required={!!completeData.rearTireCount && completeData.rearTireCount !== '0'} error={errors.rearBrand} />
              {completeData.frontBrand && <button type="button" onClick={copyFrontBrandToRear} className="absolute right-2 top-9 text-[#0054A4] hover:text-blue-700 p-1 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors" title="Copier la marque avant">
                  <CopyIcon className="h-4 w-4" />
                </button>}
            </div>
            <div className="relative">
              <InputField label="Profil" id="rearModel" value={completeData.rearModel} onChange={value => updateData({
              rearModel: value
            })} placeholder="Primacy 5" required={!!completeData.rearTireCount && completeData.rearTireCount !== '0'} error={errors.rearModel} />
              {completeData.frontModel && <button type="button" onClick={copyFrontModelToRear} className="absolute right-2 top-9 text-[#0054A4] hover:text-blue-700 p-1 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors" title="Copier le profil avant">
                  <CopyIcon className="h-4 w-4" />
                </button>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <InputField label="Dimension" id="rearDimension" value={completeData.rearDimension} onChange={value => updateData({
                rearDimension: value
              })} placeholder="Ex: 195/60/R16" required={!!completeData.rearTireCount && completeData.rearTireCount !== '0'} error={errors.rearDimension} />
                {completeData.frontDimension && <button type="button" onClick={copyFrontDimensionToRear} className="absolute right-2 top-9 text-[#0054A4] hover:text-blue-700 p-1 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors" title="Copier la dimension avant">
                    <CopyIcon className="h-4 w-4" />
                  </button>}
              </div>
              <div className="relative">
                <InputField label="Indices" id="rearIndex" value={completeData.rearIndex} onChange={value => updateData({
                rearIndex: value
              })} placeholder="Ex: 96H" />
                {completeData.frontIndex && <button type="button" onClick={copyFrontIndexToRear} className="absolute right-2 top-9 text-[#0054A4] hover:text-blue-700 p-1 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors" title="Copier les indices avant">
                    <CopyIcon className="h-4 w-4" />
                  </button>}
              </div>
            </div>
            <InputField label="NB de pneus" id="rearTireCount" value={completeData.rearTireCount} onChange={value => updateData({
            rearTireCount: value
          })} placeholder="Nombre" type="number" required error={errors.rearTireCount} />
          </div>
        </div>
      </div>
      {/* Tableau des forfaits - Section cliquable */}
      <div className="bg-gray-50 p-4 rounded-lg border mb-6">
        <button className="flex justify-between items-center w-full text-left" onClick={() => setShowServices(!showServices)}>
          <h3 className="text-lg font-medium text-gray-700">
            Forfaits et services
          </h3>
          {showServices ? <ChevronUpIcon className="h-5 w-5 text-gray-500" /> : <ChevronDownIcon className="h-5 w-5 text-gray-500" />}
        </button>
        {showServices && <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Service
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Quantité
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Forfait main d'œuvre */}
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">
                    Forfait MO <span className="text-red-500">*</span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input type="number" className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#0054A4] ${errors.laborCount ? 'border-red-500' : 'border-gray-300'}`} value={completeData.laborCount} onChange={e => updateData({
                  laborCount: e.target.value
                })} placeholder="Nombre" />
                    {errors.laborCount && <p className="mt-1 text-xs text-red-500">
                        {errors.laborCount}
                      </p>}
                  </td>
                </tr>
                {/* Valves */}
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">
                    Valve <span className="text-red-500">*</span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input type="number" className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#0054A4] ${errors.valveCount ? 'border-red-500' : 'border-gray-300'}`} value={completeData.valveCount} onChange={e => updateData({
                  valveCount: e.target.value
                })} placeholder="Nombre" />
                    {errors.valveCount && <p className="mt-1 text-xs text-red-500">
                        {errors.valveCount}
                      </p>}
                  </td>
                </tr>
                {/* Azote */}
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">
                    Azote
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0054A4]" value={completeData.nitrogenCount} onChange={e => updateData({
                  nitrogenCount: e.target.value
                })} placeholder="Nombre" />
                  </td>
                </tr>
                {/* Réparation crevaison */}
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">
                    Rép. crevaison
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0054A4]" value={completeData.punctureRepairCount} onChange={e => updateData({
                  punctureRepairCount: e.target.value
                })} placeholder="Nombre" />
                  </td>
                </tr>
                {/* Dépose/pose */}
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">
                    Dépose / pose
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0054A4]" value={completeData.mountingCount} onChange={e => updateData({
                  mountingCount: e.target.value
                })} placeholder="Nombre" />
                  </td>
                </tr>
                {/* Permutation */}
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">
                    Permutation
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0054A4]" value={completeData.rotationCount} onChange={e => updateData({
                  rotationCount: e.target.value
                })} placeholder="Nombre" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>}
      </div>
      {/* Options supplémentaires - Section cliquable */}
      <div className="bg-gray-50 p-4 rounded-lg border mb-6">
        <button className="flex justify-between items-center w-full text-left" onClick={() => setShowOptions(!showOptions)}>
          <h3 className="text-lg font-medium text-gray-700">
            Options supplémentaires
          </h3>
          {showOptions ? <ChevronUpIcon className="h-5 w-5 text-gray-500" /> : <ChevronDownIcon className="h-5 w-5 text-gray-500" />}
        </button>
        {showOptions && <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Checkbox label="Assurance pneumatique" id="tireInsurance" checked={completeData.tireInsurance} onChange={checked => updateData({
            tireInsurance: checked
          })} />
              <Checkbox label="Assurance dépannage" id="roadAssistance" checked={completeData.roadAssistance} onChange={checked => updateData({
            roadAssistance: checked
          })} />
              <Checkbox label="Réutilisation valve élec." id="valveReuse" checked={completeData.valveReuse} onChange={checked => updateData({
            valveReuse: checked
          })} />
              <Checkbox label="Entretien valves élect." id="valveMaintenance" checked={completeData.valveMaintenance} onChange={checked => updateData({
            valveMaintenance: checked
          })} />
              <Checkbox label="Équilibrage type" id="balancingType" checked={completeData.balancingType} onChange={checked => updateData({
            balancingType: checked
          })} />
              <Checkbox label="Géométrie type" id="geometryType" checked={completeData.geometryType} onChange={checked => updateData({
            geometryType: checked
          })} />
              <Checkbox label="CONT. REG. AV-AR" id="contReg" checked={completeData.contReg} onChange={checked => updateData({
            contReg: checked
          })} />
            </div>
            {/* Nouveau champ pour Accord mise au déchet */}
            <div className="mt-4">
              <InputField label="Accord mise au déchet (nombre de pneus)" id="wasteAgreementCount" value={completeData.wasteAgreementCount} onChange={value => updateData({
            wasteAgreementCount: value
          })} placeholder="Nombre de pneus" type="number" />
            </div>
          </div>}
      </div>
      <div className="mt-8 flex justify-between">
        <Button onClick={onPrevious} variant="secondary">
          Précédent
        </Button>
        <Button onClick={handleNext}>Suivant</Button>
      </div>
    </div>;
};
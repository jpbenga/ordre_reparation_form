import React, { useState } from 'react';
import { Checkbox } from '../components/Checkbox';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import { InfoIcon } from 'lucide-react';
interface StorageData {
  outbound: {
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
  };
  inbound: {
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
  };
}
interface StorageProps {
  data: StorageData;
  updateData: (data: Partial<StorageData>) => void;
  onPrevious: () => void;
  onFinish: () => void;
}
export const Storage = ({
  data,
  updateData,
  onPrevious,
  onFinish
}: StorageProps) => {
  // Initialiser les données manquantes avec des valeurs par défaut
  const completeData = {
    outbound: {
      count: data.outbound?.count || '',
      wheel: data.outbound?.wheel || false,
      hubcap: data.outbound?.hubcap || false,
      screws: data.outbound?.screws || false,
      location: data.outbound?.location || '',
      profile: data.outbound?.profile || '',
      dimension: data.outbound?.dimension || '',
      brand: data.outbound?.brand || '',
      tireProfile: data.outbound?.tireProfile || '',
      isBackAtCenter: data.outbound?.isBackAtCenter || false
    },
    inbound: {
      count: data.inbound?.count || '',
      wheel: data.inbound?.wheel || false,
      hubcap: data.inbound?.hubcap || false,
      screws: data.inbound?.screws || false,
      location: data.inbound?.location || '',
      profile: data.inbound?.profile || '',
      dimension: data.inbound?.dimension || '',
      brand: data.inbound?.brand || '',
      tireProfile: data.inbound?.tireProfile || '',
      isBackAtCenter: data.inbound?.isBackAtCenter || false
    }
  };
  const [errors, setErrors] = useState({
    inboundBrand: '',
    inboundTireProfile: '',
    inboundDimension: ''
  });
  const updateOutboundData = outboundData => {
    updateData({
      outbound: {
        ...completeData.outbound,
        ...outboundData
      }
    });
  };
  const updateInboundData = inboundData => {
    updateData({
      inbound: {
        ...completeData.inbound,
        ...inboundData
      }
    });
  };
  const validate = () => {
    const newErrors = {
      inboundBrand: '',
      inboundTireProfile: '',
      inboundDimension: ''
    };
    // Validation conditionnelle pour l'entrée stock
    if (completeData.inbound.count && completeData.inbound.count !== '0') {
      if (!completeData.inbound.brand) {
        newErrors.inboundBrand = "La marque est requise pour l'entrée stock";
      }
      if (!completeData.inbound.tireProfile) {
        newErrors.inboundTireProfile = "Le profil est requis pour l'entrée stock";
      }
      if (!completeData.inbound.dimension) {
        newErrors.inboundDimension = "La dimension est requise pour l'entrée stock";
      }
    }
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };
  const handleFinish = () => {
    if (validate()) {
      onFinish();
    }
  };
  return <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-[#333333] mb-6">GARDIENNAGE</h2>
      <div className="bg-blue-50 p-4 rounded-lg mb-6 border-l-4 border-[#0054A4]">
        <div className="flex items-start">
          <InfoIcon className="w-5 h-5 text-[#0054A4] mr-2 mt-0.5" />
          <p className="text-sm text-gray-700">
            Le champ "Emplacement" ne peut être renseigné qu'une fois de retour
            au centre. Veuillez cocher la case "De retour au centre" pour
            activer ce champ.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Section Sortie Stock */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-lg font-medium text-[#0054A4] mb-4">
            Sortie stock
          </h3>
          <div className="space-y-4">
            <InputField label="Nombre de pneus" id="outboundCount" value={completeData.outbound.count} onChange={value => updateOutboundData({
            count: value
          })} placeholder="Nombre de pneus en sortie" type="number" />
            {completeData.outbound.count && completeData.outbound.count !== '0' && <>
                  <div className="ml-4 space-y-3">
                    <Checkbox label="Roue" id="outboundWheel" checked={completeData.outbound.wheel} onChange={checked => updateOutboundData({
                wheel: checked
              })} />
                    <Checkbox label="Enjoliveur" id="outboundHubcap" checked={completeData.outbound.hubcap} onChange={checked => updateOutboundData({
                hubcap: checked
              })} />
                    <Checkbox label="Visserie" id="outboundScrews" checked={completeData.outbound.screws} onChange={checked => updateOutboundData({
                screws: checked
              })} />
                  </div>
                  <InputField label="Marque" id="outboundBrand" value={completeData.outbound.brand} onChange={value => updateOutboundData({
              brand: value
            })} placeholder="Michelin" />
                  <InputField label="Profil" id="outboundTireProfile" value={completeData.outbound.tireProfile} onChange={value => updateOutboundData({
              tireProfile: value
            })} placeholder="Primacy 5" />
                  <InputField label="Dimension" id="outboundDimension" value={completeData.outbound.dimension} onChange={value => updateOutboundData({
              dimension: value
            })} placeholder="Ex: 205/55R16" />
                  <InputField label="Profondeur des sculptures (mm)" id="outboundProfile" value={completeData.outbound.profile} onChange={value => updateOutboundData({
              profile: value
            })} placeholder="Mesure en mm" />
                  <div className="pt-2 border-t border-gray-200">
                    <Checkbox label="De retour au centre" id="outboundBackAtCenter" checked={completeData.outbound.isBackAtCenter} onChange={checked => updateOutboundData({
                isBackAtCenter: checked
              })} />
                  </div>
                  <InputField label="Emplacement" id="outboundLocation" value={completeData.outbound.location} onChange={value => updateOutboundData({
              location: value
            })} placeholder="Précisez l'emplacement" disabled={!completeData.outbound.isBackAtCenter} className={!completeData.outbound.isBackAtCenter ? 'opacity-50' : ''} />
                  {!completeData.outbound.isBackAtCenter && <p className="text-xs text-gray-500 italic">
                      L'emplacement sera à renseigner une fois de retour au
                      centre
                    </p>}
                </>}
          </div>
        </div>
        {/* Section Entrée Stock */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-lg font-medium text-[#0054A4] mb-4">
            Entrée stock
          </h3>
          <div className="space-y-4">
            <InputField label="Nombre de pneus" id="inboundCount" value={completeData.inbound.count} onChange={value => updateInboundData({
            count: value
          })} placeholder="Nombre de pneus en entrée" type="number" />
            {completeData.inbound.count && completeData.inbound.count !== '0' && <>
                  <div className="ml-4 space-y-3">
                    <Checkbox label="Roue" id="inboundWheel" checked={completeData.inbound.wheel} onChange={checked => updateInboundData({
                wheel: checked
              })} />
                    <Checkbox label="Enjoliveur" id="inboundHubcap" checked={completeData.inbound.hubcap} onChange={checked => updateInboundData({
                hubcap: checked
              })} />
                    <Checkbox label="Visserie" id="inboundScrews" checked={completeData.inbound.screws} onChange={checked => updateInboundData({
                screws: checked
              })} />
                  </div>
                  <InputField label="Marque" id="inboundBrand" value={completeData.inbound.brand} onChange={value => updateInboundData({
              brand: value
            })} placeholder="Michelin" required error={errors.inboundBrand} />
                  <InputField label="Profil" id="inboundTireProfile" value={completeData.inbound.tireProfile} onChange={value => updateInboundData({
              tireProfile: value
            })} placeholder="Primacy 5" required error={errors.inboundTireProfile} />
                  <InputField label="Dimension" id="inboundDimension" value={completeData.inbound.dimension} onChange={value => updateInboundData({
              dimension: value
            })} placeholder="Ex: 205/55R16" required error={errors.inboundDimension} />
                  <InputField label="Profondeur des sculptures (mm)" id="inboundProfile" value={completeData.inbound.profile} onChange={value => updateInboundData({
              profile: value
            })} placeholder="Mesure en mm" />
                  <div className="pt-2 border-t border-gray-200">
                    <Checkbox label="De retour au centre" id="inboundBackAtCenter" checked={completeData.inbound.isBackAtCenter} onChange={checked => updateInboundData({
                isBackAtCenter: checked
              })} />
                  </div>
                  <InputField label="Emplacement" id="inboundLocation" value={completeData.inbound.location} onChange={value => updateInboundData({
              location: value
            })} placeholder="Précisez l'emplacement" disabled={!completeData.inbound.isBackAtCenter} className={!completeData.inbound.isBackAtCenter ? 'opacity-50' : ''} />
                  {!completeData.inbound.isBackAtCenter && <p className="text-xs text-gray-500 italic">
                      L'emplacement sera à renseigner une fois de retour au
                      centre
                    </p>}
                </>}
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-between">
        <Button onClick={onPrevious} variant="secondary">
          Précédent
        </Button>
        <Button onClick={handleFinish}>Finaliser</Button>
      </div>
    </div>;
};
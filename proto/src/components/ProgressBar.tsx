import React from 'react';
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}
export const ProgressBar = ({
  currentStep,
  totalSteps
}: ProgressBarProps) => {
  const progress = currentStep / totalSteps * 100;
  return <div className="mb-8 mt-4">
      <div className="flex justify-between mb-2">
        {Array.from({
        length: totalSteps
      }, (_, i) => <div key={i} className={`flex flex-col items-center ${i < currentStep ? 'text-[#0054A4] font-medium' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1
                ${i + 1 === currentStep ? 'bg-[#FFDE00] text-[#0054A4]' : i + 1 < currentStep ? 'bg-[#0054A4] text-white' : 'bg-gray-200 text-gray-400'}`}>
                {i + 1}
              </div>
              <span className="text-xs hidden md:block">
                {i === 0 ? 'Conducteur' : i === 1 ? 'Véhicule' : i === 2 ? 'État' : i === 3 ? 'Pneumatiques' : 'Gardiennage'}
              </span>
            </div>)}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-[#0054A4] h-2.5 rounded-full" style={{
        width: `${progress}%`
      }}></div>
      </div>
    </div>;
};
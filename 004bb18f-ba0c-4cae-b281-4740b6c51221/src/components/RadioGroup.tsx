import React from 'react';
interface RadioOption {
  value: string;
  label: string;
}
interface RadioGroupProps {
  label: string;
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}
export const RadioGroup = ({
  label,
  name,
  options,
  value,
  onChange,
  required = false
}: RadioGroupProps) => {
  return <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex space-x-4">
        {options.map(option => <div key={option.value} className="flex items-center">
            <input type="radio" id={`${name}-${option.value}`} name={name} value={option.value} checked={value === option.value} onChange={() => onChange(option.value)} className="h-4 w-4 text-[#0054A4] focus:ring-[#0054A4] border-gray-300" />
            <label htmlFor={`${name}-${option.value}`} className="ml-2 block text-sm text-gray-700">
              {option.label}
            </label>
          </div>)}
      </div>
    </div>;
};
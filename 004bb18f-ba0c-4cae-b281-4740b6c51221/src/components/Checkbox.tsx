import React from 'react';
interface CheckboxProps {
  label: string;
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}
export const Checkbox = ({
  label,
  id,
  checked,
  onChange
}: CheckboxProps) => {
  return <div className="flex items-center mb-3">
      <input type="checkbox" id={id} checked={checked} onChange={e => onChange(e.target.checked)} className="h-4 w-4 text-[#0054A4] focus:ring-[#0054A4] border-gray-300 rounded" />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
        {label}
      </label>
    </div>;
};
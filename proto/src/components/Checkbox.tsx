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
  return <div className="flex items-center">
      <input type="checkbox" id={id} checked={checked} onChange={e => onChange(e.target.checked)} className="w-4 h-4 text-[#0054A4] border-gray-300 rounded focus:ring-[#0054A4] print:border-gray-400" />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-700 print:text-black">
        {label}
      </label>
    </div>;
};
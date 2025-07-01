import React from 'react';
interface InputFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
}
export const InputField = ({
  label,
  id,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  required = false,
  error = ''
}: InputFieldProps) => {
  return <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input type={type} id={id} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#0054A4]'}`} />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>;
};
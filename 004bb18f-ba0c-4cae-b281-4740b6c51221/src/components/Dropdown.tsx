import React, { useEffect, useState, useRef } from 'react';
import { ChevronDownIcon } from 'lucide-react';
interface DropdownProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
  error?: string;
}
export const Dropdown = ({
  label,
  id,
  value,
  onChange,
  options,
  required = false,
  error = ''
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return <div className="mb-4" ref={dropdownRef}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <button type="button" id={id} className={`w-full px-3 py-2 text-left border rounded-md focus:outline-none focus:ring-2 bg-white
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#0054A4]'}`} onClick={() => setIsOpen(!isOpen)}>
          {value || 'Sélectionner'}
          <ChevronDownIcon className="absolute right-2 top-2.5 h-5 w-5 text-gray-400" />
        </button>
        {isOpen && <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {options.map(option => <div key={option} className="px-3 py-2 cursor-pointer hover:bg-gray-100" onClick={() => {
          onChange(option);
          setIsOpen(false);
        }}>
                {option}
              </div>)}
          </div>}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>;
};
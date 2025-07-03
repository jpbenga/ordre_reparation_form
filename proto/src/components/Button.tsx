import React from 'react';
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
  disabled?: boolean;
}
export const Button = ({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false
}: ButtonProps) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = {
    primary: 'bg-[#0054A4] text-white hover:bg-[#004080] focus:ring-[#0054A4]',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500'
  };
  return <button type={type} onClick={onClick} disabled={disabled} className={`${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      {children}
    </button>;
};
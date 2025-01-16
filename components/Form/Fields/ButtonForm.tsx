

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: 'filled' | 'outline';
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const ButtonForm = ({
  children,
  variant = 'filled',
  fullWidth = false,
  className = '',
  onClick,
  
  ...props
}: ButtonProps) => {
  const baseStyles = 'px-6 py-2 rounded-md font-medium transition-colors duration-200 text-base';
  const widthStyles = fullWidth ? 'w-full' : 'w-auto';
  
  const variantStyles = {
    filled: 'bg-[#0088cc] hover:bg-[#006699] text-white',
    outline: 'border border-[#0088cc] text-[#0088cc] hover:bg-[#0088cc] hover:text-white'
  };

  const combinedStyles = `${baseStyles} ${widthStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button 
      className={combinedStyles}
   
      {...props}
    >
      {children}
    </button>
  );
};


export default ButtonForm;
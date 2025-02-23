import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label?: string;
  options: RadioOption[];
  value?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  error?: string;
  register?: UseFormRegisterReturn;
  required?: boolean;
}

const RadioGroupForm = ({
  label,
  options,
  value,
  onChange,
  name,
  error,
  register,
  required = true,
}: RadioGroupProps) => {
  return (
    <div className="w-full">
      <fieldset className="flex flex-col gap-4">
      <legend  className="block text-right text-gray-700">
            {label}
            {required && <span className="text-red-500 mr-1">*</span>}
          </legend>
        <div className="flex items-center justify-between">
          <div className="flex gap-8">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="relative">
                <input
                  id={`radio-${option.value}`}
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={value === option.value} 
                  onChange={(e) => {
                    register?.onChange(e);
                    onChange?.(e);
                  }}                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  {...register}
                 
                />
                   </div>
                <label
                  htmlFor={`radio-${option.value}`}
                  className="text-sm font-medium text-gray-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        
        </div>
        {error && (
          <p className="text-sm text-red-500 text-right">{error}</p>
        )}
      </fieldset>
    </div>
  );
};

export default RadioGroupForm;
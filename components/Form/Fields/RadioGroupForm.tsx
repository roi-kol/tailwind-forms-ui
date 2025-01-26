import React, { ChangeEventHandler, HTMLAttributes } from "react";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps<T> extends HTMLAttributes<T> {
  label?: string;
  options: RadioOption[];
  value?: string;
  onChange?: ChangeEventHandler<T> | undefined;
  name: string;
  error?: string;
  required?: boolean;
}

const RadioGroupForm = ({
  label,
  options,
  value,
  onChange,
  name,
  error,
  required = true,
}: RadioGroupProps<HTMLInputElement>) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <fieldset className="space-y-3">
        <legend className="block text-right text-gray-700">
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </legend>
        {options.map((option) => (
          <div
            key={option.value}
            className="flex items-center  cursor-pointer group"
          >
            <div className="relative">
              <input
              id={`radio-${option.value}`}
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={onChange}
                className="appearance-none w-5 h-5 border-2 border-gray-300 rounded-full 
                          checked:border-blue-500 checked:border-4 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              />
            </div>
            <label htmlFor={`radio-${option.value}`} className="mr-2 text-gray-700">{option.label}</label>
          </div>
        ))}
      </fieldset>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default RadioGroupForm;

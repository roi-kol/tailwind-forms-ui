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
      {/* {title && (
        <h4 className="text-xl font-medium text-right mb-2">{title}</h4>
      )} */}
      {/* {subtitle && <h3 className="text-lg text-right mb-4">{subtitle}</h3>} */}
      <div className="space-y-3">
        <label className="block text-right text-gray-700">
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center  cursor-pointer group"
          >
            <div className="relative">
              <input
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
            <span className="mr-2 text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};


export default RadioGroupForm;

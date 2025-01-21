import React, { ChangeEventHandler, HTMLAttributes, forwardRef } from 'react';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps extends HTMLAttributes<HTMLSelectElement> {
  options: Option[];
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  className?: string;
  name?: string;
  required?: boolean;
  error?: string;
}

const DropdownForm = forwardRef<HTMLSelectElement, DropdownProps>(({
  options,
  placeholder = '',
  value,
  onChange,
  className = '',
  name,
  required = false,
  label,
  error,
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <label className="block text-right text-gray-700">
            {label}
            {required && <span className="text-red-500 mr-1">*</span>}
          </label>
        </div>
      )}
      <div className="relative">
        <select
          ref={ref}
          value={value}
          onChange={onChange}
          className={`
            w-full
            px-3
            py-2
            text-right
            bg-white
            border
            border-gray-300
            rounded-md
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-transparent
            appearance-none
            ${className}
          `}
          name={name}
          required={required}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-1 text-right text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

// Add display name for debugging purposes
DropdownForm.displayName = 'DropdownForm';

export default DropdownForm;
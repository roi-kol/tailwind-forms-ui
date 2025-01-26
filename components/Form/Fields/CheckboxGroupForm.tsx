import React from 'react';

interface Option {
  id: string;
  value: string;
  label: string;
}

interface CheckboxGroupFormProps {
  title?: string;
  options: Option[];
  selectedValues?: string[];
  onChange: (values: string[]) => void;
  error?: string;  // Added error prop
  required?: boolean;  // Added required prop
  name?: string;
}

const CheckboxGroupForm: React.FC<CheckboxGroupFormProps> = ({
  title,
  options,
  selectedValues = [],
  onChange,
  error,  // Add error to props
  required = false,
  name,
  ...props
}) => {
  const handleCheckboxChange = (value: string) => {
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(updatedValues);
  };

  return (
    <fieldset className="w-full mb-4">
      {title && (
        <legend className="flex justify-between items-center mb-2">
          <label className="block text-right text-gray-700">
            {title}
            {required && <span className="text-red-500 mr-1">*</span>}
          </label>
        </legend>
      )}
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <input
          
              type="checkbox"
              name={name}
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
              className="h-4 w-4 m-2 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              {...props}
              id={`checkbox-${option.id}`}
            />
            <label htmlFor={`checkbox-${option.id}`} className="text-gray-700 mr-2">{option.label}</label>
            
          </div>
        ))}
      </div>
      {error && (
        <p className="mt-1 text-right text-sm text-red-500">{error}</p>
      )}
    </fieldset>
  );
};

export default CheckboxGroupForm;
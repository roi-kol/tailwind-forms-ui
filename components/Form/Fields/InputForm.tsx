import React, { ChangeEventHandler, HTMLAttributes, useState } from 'react';

interface InputProps<T> extends HTMLAttributes<T> {
  value?: string;
  onChange?: ChangeEventHandler<T> | undefined;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel' | 'password';
  required?: boolean;
  error?: string;
  className?: string;
  name?: string;
  maxLength?: number;
  disabled?: boolean;
  regex?: RegExp;
  errorMessage?: string;
}

const InputForm = ({
  value,
  onChange,
  label,
  placeholder,
  type = 'text',
  required = false,
  error,
  className = '',
  name,
  maxLength,
  disabled = false,
  regex,
  errorMessage = "שדה לא תקין",
}: InputProps<HTMLInputElement>) => {

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (required && !newValue) {
      setErrorMsg("שדה חובה"); }
    else if (regex && !regex.test(newValue)) {
      setErrorMsg(errorMessage);
    } else {
      setErrorMsg(null);
    }
    onChange && onChange(e);
  };

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
        <input
          type={type}
          value={value}
          onChange={(e) => handleChange && handleChange(e)}
          placeholder={placeholder}
          required={required}
          name={name}
          maxLength={maxLength}
          disabled={disabled}
          className={`
            w-full
            px-4
            py-2
            text-right
            border
            border-gray-300
            rounded-md
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-transparent
            disabled:bg-gray-100
            disabled:cursor-not-allowed
            ${error ? 'border-red-500' : ''}
            ${errorMsg ? 'border-red-500' : ''}
            ${className}
          `}
        />
        {maxLength && (
          <div className="absolute bottom-2 left-2 text-sm text-gray-500">
            {value?.length ?? 0}/{maxLength}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-right text-sm text-red-500">{error}</p>
      )}
      {errorMsg && (
        <p className="mt-1 text-right text-sm text-red-500">{errorMsg}</p>
      )}
    </div>
  );
};

// // Usage example component
//  <InputForm
//                     label="שם מלא"
//                     placeholder="הכנס שם מלא"
//                     value={formData.name}
//                     onChange={(e) => handleInputChange("name", e.target.value)}
//                     required
//                   />

export default InputForm;
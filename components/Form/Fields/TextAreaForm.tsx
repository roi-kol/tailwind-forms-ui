import React, { ChangeEventHandler, HTMLAttributes } from 'react';

interface TextAreaProps<T> extends HTMLAttributes<T> {
  value?: string;
//   onChange: (value: string) => void;
  onChange?: ChangeEventHandler<T> | undefined;
  placeholder?: string;
  label?: string;
  rows?: number;
  maxLength?: number;
  required?: boolean;
  className?: string;
  name?: string;
  error?: string;
}

const TextAreaForm = ({
  value = '',
  onChange,
  placeholder,
  label,
  rows = 4,
  maxLength,
  required = false,
  className = '',
  name,
  error,
}: TextAreaProps<HTMLTextAreaElement>) => {
  const characterCount = value ? value.length : 0;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-right mb-1 text-gray-700">
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>
      )}
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange && onChange(e)}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          required={required}
          name={name}
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
            resize-none
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
        />
        {maxLength && (
          <div className="absolute bottom-2 left-2 text-sm text-gray-500">
            {characterCount}/{maxLength}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-right text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default TextAreaForm;
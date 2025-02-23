import React, { useState, useEffect, useRef } from 'react';

interface Option {
  value: string;
  label: string;
  id: number;
}

interface AutocompleteProps {
  options: Option[];
  value?: number;
  onChange: (value: number) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

const AutocompleteForm = ({
  options,
  value,
  onChange,
  label,
  placeholder = ' ...',
  required = false,
  error,
  className = '',
}: AutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [inputValue, setInputValue] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Set initial input value based on selected option or placeholder
  useEffect(() => {
    if (value) {
      const selectedOption = options.find(opt => opt.id === value);
      if (selectedOption) {
        setInputValue(selectedOption.label);
      }
    } else {
      setInputValue('');  // Reset to empty when no value is selected
    }
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // If no value is selected, reset to placeholder view
        if (!value) {
          setInputValue('');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value]);

  useEffect(() => {
    const filtered = options.filter(option =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [inputValue, options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (option: Option) => {
    setInputValue(option.label);
    onChange(option.id);
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    // Clear input value when focusing if no option is selected
    if (!value) {
      setInputValue('');
    }
  };

  return (
    <div className="w-full" ref={wrapperRef}>
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
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
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
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
        />
        
        {isOpen && filteredOptions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleOptionClick(option)}
                className="px-4 py-2 text-right hover:bg-gray-100 cursor-pointer"
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-right text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default AutocompleteForm;
import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

interface DatePickerFormProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  name?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  rtl?: boolean;
  onBlur?: () => void;
}

const formatDateForDisplay = (date: string): string => {
  if (!date) return '';
  try {
    const [year, month, day] = date.split('-').map(part => part.padStart(2, '0'));
    return `${day}/${month}/${year}`;
  } catch {
    return '';
  }
};

const formatDateForInput = (dateStr: string): string => {
  if (!dateStr) return '';
  try {
    const [day, month, year] = dateStr.split('/');
    if (!day || !month || !year) return '';
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  } catch {
    return '';
  }
};

const formatUserInput = (input: string): string => {
  // Remove all non-digits
  const digits = input.replace(/\D/g, '');
  
  // Format as DD/MM/YYYY
  if (digits.length <= 2) {
    return digits;
  } else if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  } else {
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
  }
};

const isValidDateFormat = (dateStr: string): boolean => {
  // Check if string matches DD/MM/YYYY format
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!regex.test(dateStr)) return false;

  const [_, day, month, year] = dateStr.match(regex) || [];
  const dayNum = parseInt(day, 10);
  const monthNum = parseInt(month, 10);
  const yearNum = parseInt(year, 10);

  // Basic range checks
  if (monthNum < 1 || monthNum > 12) return false;
  if (dayNum < 1 || dayNum > 31) return false;
  if (yearNum < 1900 || yearNum > 2100) return false;

  // Check for valid date (handles months with different days)
  const date = new Date(yearNum, monthNum - 1, dayNum);
  return date.getDate() === dayNum &&
         date.getMonth() === monthNum - 1 &&
         date.getFullYear() === yearNum;
};

const DatePickerForm = forwardRef<HTMLInputElement, DatePickerFormProps>(
  (
    {
      label,
      value,
      onChange,
      className = '',
      name,
      required = false,
      error,
      placeholder = 'dd/mm/yyyy',
      min,
      max,
      rtl = true,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = useState<string>('');
    const containerRef = useRef<HTMLDivElement>(null);
    const hiddenDateInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      // Update display value when value prop changes
      if (value) {
        setDisplayValue(formatDateForDisplay(value));
      } else {
        setDisplayValue('');
      }
    }, [value]);

    const handleDatePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newDate = e.target.value; // YYYY-MM-DD
      if (onChange) {
        onChange(newDate);
      }
    };

    const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatUserInput(e.target.value);
      setDisplayValue(formatted);

      // If we have a complete date, validate and update
      if (isValidDateFormat(formatted)) {
        const dateForInput = formatDateForInput(formatted);
        if (onChange) {
          onChange(dateForInput);
        }
      }
    };

    const handleBlur = () => {
      if (onBlur) {
        onBlur();
      }

      // Validate date on blur
      if (displayValue && !isValidDateFormat(displayValue)) {
        setDisplayValue('');
        if (onChange) {
          onChange('');
        }
      }
    };

    const handleCalendarClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (hiddenDateInputRef.current) {
        hiddenDateInputRef.current.showPicker();
      }
    };

    const handleTextInputClick = () => {
      if (hiddenDateInputRef.current) {
        hiddenDateInputRef.current.showPicker();
      }
    };

    return (
      <div className="w-full" ref={containerRef}>
        {label && (
          <div className="flex justify-between items-center mb-1">
            <label className={`block ${rtl ? 'text-right' : 'text-left'} text-gray-700`}>
              {label}
              {required && <span className="text-red-500 mx-1">*</span>}
            </label>
          </div>
        )}
        <div className="relative">
          <input
            ref={ref}
            type="text"
            value={displayValue}
            onChange={handleTextInputChange}
            onBlur={handleBlur}
            onClick={handleTextInputClick}
            className={`
              w-full
              px-4
              py-2
              ${rtl ? 'text-right' : 'text-left'}
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
            placeholder={placeholder}
            required={required}
            dir={rtl ? 'rtl' : 'ltr'}
            maxLength={10}
          />
          <input
            ref={hiddenDateInputRef}
            type="date"
            value={value || ''}
            onChange={handleDatePickerChange}
            // className="hidden"
                 className="absolute opacity-0 h-0 w-0"
            name={name}
            min={min}
            max={max}
            {...props}
          />
          <FaCalendarAlt
            className={`absolute ${rtl ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer`}
            onClick={handleCalendarClick}
          />
        </div>
        {error && (
          <p className={`mt-1 ${rtl ? 'text-right' : 'text-left'} text-sm text-red-500`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

DatePickerForm.displayName = 'DatePickerForm';

export default DatePickerForm;
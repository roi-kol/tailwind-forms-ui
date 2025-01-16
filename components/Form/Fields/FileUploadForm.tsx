import React, { ChangeEventHandler, HTMLAttributes, useState } from 'react';

interface FileUploadProps<T> extends HTMLAttributes<T> {
  label?: string;
  onChange?: ChangeEventHandler<T> | undefined;
  required?: boolean;
  error?: string;
  className?: string;
  name?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  value?: FileList | null;
}

const FileUploadForm = ({
  label,
  onChange,
  required = false,
  error,
  className = '',
  name,
  accept = 'image/*,.pdf,.doc,.docx',
  multiple = false,
  maxSize = 5 * 1024 * 1024, // 5MB default
  allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  value,
}: FileUploadProps<HTMLInputElement>) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState<string>('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (file.size > maxSize) {
      setFileError(`הקובץ גדול מדי. גודל מקסימלי מותר: ${Math.round(maxSize / 1024 / 1024)}MB`);
      return false;
    }
    
    if (!allowedTypes.includes(file.type)) {
      setFileError('סוג קובץ לא נתמך');
      return false;
    }

    setFileError('');
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      let valid = true;
      Array.from(files).forEach(file => {
        if (!validateFile(file)) {
          valid = false;
        }
      });
      
      if (valid && onChange) {
        onChange(e);
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      let valid = true;
      Array.from(files).forEach(file => {
        if (!validateFile(file)) {
          valid = false;
        }
      });
      
      if (valid && inputRef.current) {
        const event = {
          target: {
            files,
            name: name || '',
            type: 'file'
          }
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        onChange && onChange(event);
      }
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const getFileNames = (): string => {
    if (!value || value.length === 0) return '';
    if (value.length === 1) return value[0].name;
    return `${value.length} קבצים נבחרו`;
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
      <div
        className={`
          relative
          border-2
          border-dashed
          rounded-lg
          p-4
          text-center
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${className}
          transition-colors
          duration-200
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          onChange={handleChange}
          accept={accept}
          multiple={multiple}
          className="hidden"
          name={name}
          required={required}
        />
        
        <div className="flex flex-col items-center justify-center gap-2">
          <svg
            className="w-8 h-8 text-gray-400 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          
          <button
            type="button"
            onClick={handleButtonClick}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            בחר קבצים
          </button>
          
          <p className="text-sm text-gray-500">
            או גרור קבצים לכאן
          </p>

          {getFileNames() && (
            <p className="text-sm text-gray-600 mt-2">
              {getFileNames()}
            </p>
          )}
        </div>
      </div>

      {(error || fileError) && (
        <p className="mt-1 text-right text-sm text-red-500">
          {error || fileError}
        </p>
      )}

      <p className="mt-2 text-right text-xs text-gray-500">
        סוגי קבצים מותרים: PDF, DOCX, JPG, PNG. גודל מקסימלי: {Math.round(maxSize / 1024 / 1024)}MB
      </p>
    </div>
  );
};

export default FileUploadForm;
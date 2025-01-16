import React, { ChangeEventHandler, HTMLAttributes } from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps<T> extends HTMLAttributes<T> {
  title?: string;
  subtitle?: string;
  options: RadioOption[];
  value?: string;
  // onChange?: (value: string) => void;
  onChange?: ChangeEventHandler<T> | undefined;
  name: string;
}

const RadioGroupForm = ({
  title,
  subtitle,
  options,
  value,
  onChange,
  name,
}: RadioGroupProps<HTMLInputElement>) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {title && (
        <h2 className="text-xl font-medium text-right mb-2">
          {title}
        </h2>
      )}
      {subtitle && (
        <h3 className="text-lg text-right mb-4">
          {subtitle}
        </h3>
      )}
      <div className="space-y-3">
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
    </div>
  );
};

// // Usage example component
// const ExampleRadioGroup = () => {
//   const [selectedValue, setSelectedValue] = React.useState('');

//   const options = [
//     { value: 'employed', label: 'מועסק' },
//     { value: 'unemployed', label: 'ללא תעסוקה' },
//   ];

//   return (
//     <div className="rtl" dir="rtl">
//       <RadioGroup
//         title="הטבה"
//         subtitle="שלב 2: מצב תעסוקה"
//         options={options}
//         value={selectedValue}
//         onChange={setSelectedValue}
//         name="employment-status"
//       />
//     </div>
//   );
// };

export default RadioGroupForm;
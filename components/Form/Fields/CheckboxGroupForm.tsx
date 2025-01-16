import React from 'react';

interface CheckboxOption {
  id: string;
  label: string;
}

interface CheckboxGroupProps {
  title?: string;
  options: CheckboxOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  className?: string;
}

const CheckboxGroupForm = ({
  title,
  options,
  selectedValues,
  onChange,
  className = '',
}: CheckboxGroupProps) => {
  const handleCheckboxChange = (id: string) => {
    if (selectedValues.includes(id)) {
      onChange(selectedValues.filter(value => value !== id));
    } else {
      onChange([...selectedValues, id]);
    }
  };

  return (
    <div className={`bg-white p-6 rounded-lg ${className}`}>
      {title && (
        <h3 className="text-right font-medium text-lg mb-4">
          {title}
        </h3>
      )}
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.id}
            // justify-end
            className="flex items-center  cursor-pointer hover:bg-gray-50 rounded-md p-1"
          >
          
            <div className="relative">
              <input
                type="checkbox"
                checked={selectedValues.includes(option.id)}
                onChange={() => handleCheckboxChange(option.id)}
                className="
                  w-5 
                  h-5 
                  border-2 
                  border-gray-300 
                  rounded 
                  checked:bg-blue-500 
                  checked:border-blue-500 
                  focus:ring-2 
                  focus:ring-blue-500 
                  focus:ring-offset-2
                  appearance-none
                "
              />
              {selectedValues.includes(option.id) && (
                <svg
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <span className="mr-2 text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

// // Usage example component
// const ExampleCheckboxGroup = () => {
//   const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

//   const options = [
//     { id: '1', label: 'פעילות ייעוץ ראשונה (אינטייק)' },
//     { id: '2', label: 'ייעוץ והכנה לראיון עבודה' },
//     { id: '3', label: 'ייעוץ להכנת קורות חיים' },
//     { id: '4', label: 'אבחון תעסוקתי עם פסיכולוג תעסוקתי' },
//     { id: '5', label: 'הכנה למבחני מיון והערכה' },
//     { id: '6', label: 'הכשרה מקצועית' },
//     { id: '7', label: 'ייעוץ לפיתוח קריירה' },
//     { id: '8', label: 'ייעוץ והכוונה לפתיחת עסק' }
//   ];

//   return (
//     <div className="max-w-2xl mx-auto p-4 rtl" dir="rtl">
//       <CheckboxGroup
//         title="שם ההטבה:"
//         options={options}
//         selectedValues={selectedOptions}
//         onChange={setSelectedOptions}
//       />
//       <div className="flex justify-between mt-4">
//         <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
//           הבא
//         </button>
//         <button className="px-6 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">
//           הקודם
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CheckboxGroup;
export default CheckboxGroupForm;
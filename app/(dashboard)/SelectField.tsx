import React from 'react';

// Define props for the SelectField component
interface SelectFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[]; // Array of options
  className?: string;
  error?: string | null; // New prop for error message
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  id,
  value,
  onChange,
  options,
  className = 'shadow-lg appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-xl transition-shadow duration-200',
  error, // Destructure the error prop
}) => {
  return (
    <div className="mb-4"> {/* Add margin below each select */}
      <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`${className} ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:border-blue-500 transition-colors duration-200`} // More prominent border color on focus
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>} {/* Display error message */}
    </div>
  );
};

export default SelectField;

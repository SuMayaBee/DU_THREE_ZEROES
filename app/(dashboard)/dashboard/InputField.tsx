import React from 'react';

// Define props for the InputField component
interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  min?: number;
  className?: string;
  error?: string | null; // New prop for error message
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type,
  value,
  onChange,
  placeholder,
  min,
  className = 'shadow-lg appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-xl transition-shadow duration-200',
  error, // Destructure the error prop
}) => {
  return (
    <div className="mb-4"> {/* Add margin below each input */}
      <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        className={`${className} ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:border-blue-500 transition-colors duration-200`} // More prominent border color on focus
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>} {/* Display error message */}
    </div>
  );
};

export default InputField;

import React from 'react';
import TextField from '@mui/material/TextField';

interface CustomInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
}

const EInput: React.FC<CustomInputProps> = ({ label, type = "text", placeholder, className }) => {
  return (
    <TextField
      type={type}
      label={label}
      placeholder={placeholder}
      variant="outlined"
      className={`${className} bg-white text-gray-700 border-2 border-gray-300`}
      fullWidth
    />
  );
};

export default EInput;

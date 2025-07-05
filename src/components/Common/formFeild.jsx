import React from 'react';
import Input from '../Common/input';

export const FormField = ({ 
  label, 
  name, 
  register, 
  errors, 
  validation, 
  disabled,
  ...inputProps 
}) => {
  return (
    <div>
      <Input
        label={label}
        disabled={disabled}
        {...register(name, validation)}
        {...inputProps}
      />
      {errors[name] && (
        <p className="text-red-400 text-sm mt-1 pl-1">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};
import React, { useState, useCallback } from 'react';

interface IUseFormResult {
  values: TValues;
  handleChange: (event: React.FormEvent<HTMLInputElement>) => void;
  errors: TErrors;
  setErrors: (value: React.SetStateAction<TErrors>) => void;
  resetForm: (newValues?: TValues, newErrors?: TErrors) => void;
}

type TValues = {
  [key: string]: string;
};

type TErrors = {
  [key: string]: string;
};

function useForm(defaultValues: TValues = {}, defaultErrors: TErrors = {}): IUseFormResult {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState(defaultErrors);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const resetForm = useCallback((newValues: TValues = {}, newErrors: TErrors = {}) => {
    setValues(newValues);
    setErrors(newErrors);
  }, [setValues, setErrors]);

  return { values, handleChange, errors, setErrors, resetForm };
}

export default useForm;

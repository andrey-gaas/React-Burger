import {useState, useCallback} from 'react';

function useForm(defaultValues = {}, defaultErrors = {}) {
  const [ values, setValues ] = useState(defaultValues);
  const [ errors, setErrors ] = useState(defaultErrors);

  const handleChange = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]: value });
    setErrors({...errors, [name]: ''});
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}) => {
    setValues(newValues);
    setErrors(newErrors);
  }, [setValues, setErrors]);

  return { values, handleChange, errors, setErrors, resetForm };
}

export default useForm;

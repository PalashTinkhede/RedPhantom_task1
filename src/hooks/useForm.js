import { useState } from 'react';
import { validateLoginForm } from '../utils/validators';

export function useForm() {
  const [values, setValues] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = validateLoginForm(values);
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  return { values, errors, handleChange, validate, setErrors };
}

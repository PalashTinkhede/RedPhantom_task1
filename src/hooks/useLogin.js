import { useState } from 'react';
import { login } from '../services/authService';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const submitLogin = async (credentials) => {
    setIsLoading(true);
    setApiError('');
    try {
      const result = await login(credentials);
      return { success: true, data: result };
    } catch (err) {
      setApiError(err.message || 'Invalid email or password.');
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, apiError, submitLogin };
}

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import styles from './PasswordInput.module.css';
import inputStyles from './InputField.module.css';

export default function PasswordInput({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  autoComplete,
  disabled,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={inputStyles.fieldContainer}>
      <label htmlFor={id} className={inputStyles.label}>
        {label} <span aria-hidden="true" className={inputStyles.required}>*</span>
      </label>
      <div className={styles.inputWrapper}>
        <input
          id={id}
          name={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          required
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${inputStyles.input} ${styles.passwordInput} ${error ? inputStyles.inputError : ''}`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={styles.toggleBtn}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          disabled={disabled}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {error && (
        <span id={`${id}-error`} className={inputStyles.errorText} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

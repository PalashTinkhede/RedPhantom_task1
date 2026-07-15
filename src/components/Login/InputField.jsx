import styles from './InputField.module.css';

export default function InputField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  autoComplete,
  required,
  disabled,
}) {
  return (
    <div className={styles.fieldContainer}>
      <label htmlFor={id} className={styles.label}>
        {label} {required && <span aria-hidden="true" className={styles.required}>*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
      />
      {error && (
        <span id={`${id}-error`} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

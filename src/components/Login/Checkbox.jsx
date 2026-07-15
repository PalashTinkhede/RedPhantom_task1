import styles from './Checkbox.module.css';

export default function Checkbox({ id, label, checked, onChange, disabled }) {
  return (
    <div className={styles.checkboxContainer}>
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={styles.checkbox}
      />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
}

import styles from './Button.module.css';

export default function Button({ children, type = 'button', variant = 'primary', isLoading = false, disabled = false, onClick }) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant]} ${isLoading ? styles.loading : ''}`}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <span className={styles.spinner} />
          Signing in...
        </>
      ) : (
        children
      )}
    </button>
  );
}

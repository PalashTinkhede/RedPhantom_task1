import { useForm } from '../../hooks/useForm';
import { useLogin } from '../../hooks/useLogin';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validatePassword } from '../../utils/validators';
import InputField from './InputField';
import PasswordInput from './PasswordInput';
import Button from './Button';
import Checkbox from './Checkbox';
import { Link } from 'react-router-dom';
import styles from './LoginForm.module.css';

export default function LoginForm({ onSuccess }) {
  const { values, errors, handleChange, validate, setErrors } = useForm();
  const { isLoading, apiError, submitLogin } = useLogin();
  const { login } = useAuth();

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMsg = '';
    if (name === 'email') errorMsg = validateEmail(value);
    if (name === 'password') errorMsg = validatePassword(value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await submitLogin({ email: values.email, password: values.password });
    if (result.success) {
      login(result.data.token);
      if (values.rememberMe) {
        localStorage.setItem('rememberedEmail', values.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      if (onSuccess) onSuccess();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate aria-label="Login form">
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Please enter your details to sign in.</p>
      </div>

      {apiError && (
        <div className={styles.apiError} role="alert" aria-live="assertive">
          {apiError}
        </div>
      )}

      <InputField
        id="email"
        label="Email"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
        placeholder="Enter your email"
        autoComplete="email"
        required
        disabled={isLoading}
      />

      <PasswordInput
        id="password"
        label="Password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.password}
        autoComplete="current-password"
        disabled={isLoading}
      />

      <div className={styles.formActions}>
        <Checkbox
          id="rememberMe"
          label="Remember me"
          checked={values.rememberMe}
          onChange={handleChange}
          disabled={isLoading}
        />
        <Link to="/forgot-password" className={styles.forgotPassword}>
          Forgot password?
        </Link>
      </div>

      <Button type="submit" variant="primary" isLoading={isLoading}>
        Sign in
      </Button>

      <p className={styles.signupText}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </form>
  );
}

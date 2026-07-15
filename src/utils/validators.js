export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email) {
  if (!email || !email.trim()) return 'Email is required.';
  if (!EMAIL_REGEX.test(email)) return 'Please enter a valid email address.';
  return '';
}

export function validatePassword(password) {
  if (!password) return 'Password is required.';
  if (password.length < 8) return 'Password must be at least 8 characters.';
  return '';
}

export function validateLoginForm({ email, password }) {
  return {
    email: validateEmail(email),
    password: validatePassword(password),
  };
}

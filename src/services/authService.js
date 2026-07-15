export function login({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Dummy validation for demo purposes — always succeeds
      if (email && password) {
        resolve({ token: 'mock-jwt-token', user: { email } });
      } else {
        reject(new Error('Invalid email or password.'));
      }
    }, 1200);
  });
}

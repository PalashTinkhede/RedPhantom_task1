import { useNavigate } from 'react-router-dom';
import { Hexagon } from 'lucide-react';
import LoginForm from '../components/Login/LoginForm';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.brandPanel}>
        <div className={styles.brandContent}>
          <div className={styles.logoWrapper}>
            <Hexagon size={48} className={styles.logoIcon} />
            <span className={styles.logoText}>LOGIN</span>
          </div>
          <div className={styles.illustrationWrapper}>
            <div className={styles.glassCard}>
              <div className={styles.glowOrb1}></div>
              <div className={styles.glowOrb2}></div>
              <h2>Empowering your digital journey</h2>
              <p>Experience the next generation of our platform with enhanced security and performance.</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.formPanel}>
        <div className={styles.mobileLogo}>
          <Hexagon size={32} className={styles.logoIcon} />
          <span className={styles.logoText}>RedPhantom</span>
        </div>
        <LoginForm onSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
}

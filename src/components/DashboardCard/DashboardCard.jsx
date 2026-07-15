import React from 'react';
import { FiUsers, FiDollarSign, FiBriefcase, FiCheckSquare, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import styles from './DashboardCard.module.css';

const iconMap = {
  FiUsers: <FiUsers />,
  FiDollarSign: <FiDollarSign />,
  FiBriefcase: <FiBriefcase />,
  FiCheckSquare: <FiCheckSquare />,
};

export const DashboardCardSkeleton = () => (
  <div className={styles.skeleton}>
    <div className={styles.skelTop}>
      <div className={styles.skelInfo}>
        <div className={`skeleton ${styles.skelTitle}`} />
        <div className={`skeleton ${styles.skelValue}`} />
      </div>
      <div className={`skeleton ${styles.skelIcon}`} />
    </div>
    <div className={`skeleton ${styles.skelBottom}`} />
  </div>
);

const DashboardCard = ({ title, value, growth, icon, color }) => {
  const isPositive = growth >= 0;

  return (
    <article className={`${styles.card} ${styles[color] || ''}`}>
      <div className={styles.top}>
        <div className={styles.info}>
          <p className={styles.title}>{title}</p>
          <p className={styles.value}>{value}</p>
        </div>
        <div className={`${styles.iconWrapper} ${styles[color] || ''}`} aria-hidden="true">
          {iconMap[icon] || <FiUsers />}
        </div>
      </div>

      <div className={styles.bottom}>
        <span className={`${styles.trend} ${isPositive ? styles.up : styles.down}`}>
          {isPositive ? <FiTrendingUp /> : <FiTrendingDown />}
          {isPositive ? '+' : ''}
          {growth}%
        </span>
        <span className={styles.trendLabel}>vs last month</span>
      </div>
    </article>
  );
};

export default DashboardCard;

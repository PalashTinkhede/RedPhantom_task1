import React, { useState, useEffect } from 'react';
import { FiCalendar, FiRefreshCw } from 'react-icons/fi';
import DashboardCard, { DashboardCardSkeleton } from '../components/DashboardCard/DashboardCard';
import ActivityTable from '../components/ActivityTable/ActivityTable';
import { fetchDashboardData } from '../services/api';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchDashboardData();
      setData(result);
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className={styles.page}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <h2>Overview</h2>
          <p>Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className={styles.dateTag}>
          <FiCalendar aria-hidden="true" />
          {today}
        </div>
      </div>

      {/* Stats Cards */}
      {error ? (
        <div className={styles.errorState} role="alert">
          <div className={styles.errorIcon}>⚠️</div>
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <button className={styles.retryBtn} onClick={loadData} id="retry-btn">
            <FiRefreshCw style={{ marginRight: 6, verticalAlign: 'middle' }} />
            Retry
          </button>
        </div>
      ) : (
        <div className={styles.cardsGrid}>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <DashboardCardSkeleton key={i} />
              ))
            : data?.stats.map((card) => (
                <DashboardCard
                  key={card.id}
                  title={card.title}
                  value={card.value}
                  growth={card.growth}
                  icon={card.icon}
                  color={card.color}
                />
              ))}
        </div>
      )}

      {/* Activity Table */}
      <ActivityTable
        activities={data?.activities || []}
        loading={loading}
      />
    </div>
  );
};

export default Dashboard;

import React from 'react';
import styles from './Placeholder.module.css';

const PlaceholderPage = ({ icon, title, description }) => (
  <div className={styles.placeholderPage}>
    <div className={styles.placeholderIcon} aria-hidden="true">{icon}</div>
    <h2 className={styles.placeholderTitle}>{title}</h2>
    <p className={styles.placeholderText}>{description}</p>
    <span className={styles.comingSoonBadge}>Coming Soon</span>
  </div>
);

export const UsersPage = () => (
  <PlaceholderPage
    icon="👥"
    title="User Management"
    description="Manage your team members, roles, and permissions from one place."
  />
);

export const ProjectsPage = () => (
  <PlaceholderPage
    icon="📁"
    title="Projects"
    description="Track, organize, and manage all your active and archived projects."
  />
);

export const TasksPage = () => (
  <PlaceholderPage
    icon="✅"
    title="Task Manager"
    description="Create, assign, and monitor tasks across your team and projects."
  />
);

export const AnalyticsPage = () => (
  <PlaceholderPage
    icon="📊"
    title="Analytics"
    description="Visualize your data with charts, reports, and insights dashboards."
  />
);

export const NotificationsPage = () => (
  <PlaceholderPage
    icon="🔔"
    title="Notifications"
    description="Stay up-to-date with real-time alerts, mentions, and system updates."
  />
);

export const SettingsPage = () => (
  <PlaceholderPage
    icon="⚙️"
    title="Settings"
    description="Configure your application preferences, integrations, and account details."
  />
);

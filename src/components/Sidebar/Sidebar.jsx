import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiGrid,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiBriefcase,
  FiCheckSquare,
  FiBell,
  FiChevronLeft,
  FiX,
  FiZap,
} from 'react-icons/fi';
import styles from './Sidebar.module.css';

const navItems = [
  {
    section: 'Main',
    links: [
      { to: '/', icon: <FiGrid />, label: 'Dashboard' },
      { to: '/users', icon: <FiUsers />, label: 'Users' },
      { to: '/projects', icon: <FiBriefcase />, label: 'Projects' },
      { to: '/tasks', icon: <FiCheckSquare />, label: 'Tasks' },
    ],
  },
  {
    section: 'Analytics',
    links: [
      { to: '/analytics', icon: <FiBarChart2 />, label: 'Analytics' },
      { to: '/notifications', icon: <FiBell />, label: 'Notifications' },
    ],
  },
  {
    section: 'System',
    links: [
      { to: '/settings', icon: <FiSettings />, label: 'Settings' },
    ],
  },
];

const Sidebar = React.memo(function Sidebar({ collapsed, onCollapse, mobileOpen, onMobileClose }) {
  const sidebarClass = [
    styles.sidebar,
    collapsed ? styles.collapsed : '',
    mobileOpen ? styles.mobileOpen : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`${styles.overlay} ${mobileOpen ? styles.show : ''}`}
        onClick={onMobileClose}
        aria-hidden="true"
      />

      <aside className={sidebarClass} aria-label="Sidebar navigation">
        {/* Mobile close button */}
        <button
          className={styles.closeBtn}
          onClick={onMobileClose}
          aria-label="Close sidebar"
        >
          <FiX />
        </button>

        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoIcon} aria-hidden="true">
            <FiZap />
          </div>
          <div className={styles.logoText}>
            <h2>RedPhantom</h2>
            <span>Admin Dashboard</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {navItems.map((section) => (
            <div key={section.section} className={styles.navSection}>
              <div className={styles.navSectionLabel}>{section.section}</div>
              {section.links.map(({ to, icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                  aria-label={label}
                >
                  <span className={styles.navIcon} aria-hidden="true">
                    {icon}
                  </span>
                  <span className={styles.navLabel}>{label}</span>
                  <span className={styles.tooltip}>{label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer: Collapse toggle */}
        <div className={styles.sidebarFooter}>
          <button
            className={styles.collapseBtn}
            onClick={onCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <span className={styles.collapseIcon}>
              <FiChevronLeft />
            </span>
            <span className={styles.collapseLabel}>Collapse</span>
          </button>
        </div>
      </aside>
    </>
  );
});

export default Sidebar;

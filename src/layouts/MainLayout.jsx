import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import styles from './MainLayout.module.css';

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/users': 'Users',
  '/projects': 'Projects',
  '/tasks': 'Tasks',
  '/analytics': 'Analytics',
  '/notifications': 'Notifications',
  '/settings': 'Settings',
};

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const pageTitle = PAGE_TITLES[location.pathname] || 'Dashboard';

  // Auto-collapse sidebar on tablet
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024 && window.innerWidth > 768) {
        setCollapsed(true);
      } else if (window.innerWidth > 1024) {
        setCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const contentClass = [
    styles.content,
    collapsed ? styles.collapsed : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.layout}>
      <Sidebar
        collapsed={collapsed}
        onCollapse={() => setCollapsed((prev) => !prev)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className={contentClass}>
        <Navbar
          onMobileMenuOpen={() => setMobileOpen(true)}
          pageTitle={pageTitle}
        />
        <main className={styles.main} id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

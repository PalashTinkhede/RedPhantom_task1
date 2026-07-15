import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiSearch, FiBell, FiSettings, FiChevronDown, FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = ({ onMobileMenuOpen, pageTitle = 'Dashboard' }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.navbar}>
      {/* Left */}
      <div className={styles.left}>
        <button
          className={styles.menuBtn}
          onClick={onMobileMenuOpen}
          aria-label="Open sidebar menu"
          id="mobile-menu-btn"
        >
          <FiMenu />
        </button>
        <h1 className={styles.pageTitle}>{pageTitle}</h1>
      </div>

      {/* Search */}
      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon} aria-hidden="true">
          <FiSearch />
        </span>
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Search users, projects, tasks..."
          aria-label="Global search"
          id="global-search"
        />
      </div>

      {/* Right Actions */}
      <div className={styles.right}>
        <button className={styles.iconBtn} aria-label="Notifications" id="notifications-btn">
          <FiBell />
          <span className={styles.badge} aria-hidden="true" />
        </button>

        <button className={styles.iconBtn} aria-label="Settings" id="settings-btn">
          <FiSettings />
        </button>

        <div className={styles.divider} aria-hidden="true" />

        {/* Profile with dropdown */}
        <div className={styles.profileWrapper} ref={dropdownRef}>
          <button
            className={styles.profile}
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-label="User profile menu"
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
            id="profile-btn"
          >
            <div className={styles.avatar} aria-hidden="true">AD</div>
            <div className={styles.profileInfo}>
              <span className={styles.profileName}>Admin User</span>
              <span className={styles.profileRole}>Super Admin</span>
            </div>
            <span className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ''}`} aria-hidden="true">
              <FiChevronDown />
            </span>
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className={styles.dropdown} role="menu" aria-label="Profile menu">
              <div className={styles.dropdownHeader}>
                <div className={styles.dropdownAvatar}>AD</div>
                <div>
                  <p className={styles.dropdownName}>Admin User</p>
                  <p className={styles.dropdownEmail}>admin@redphantom.io</p>
                </div>
              </div>
              <div className={styles.dropdownDivider} />
              <button className={styles.dropdownItem} role="menuitem" id="dropdown-profile-btn">
                <FiUser />
                My Profile
              </button>
              <button className={styles.dropdownItem} role="menuitem" id="dropdown-settings-btn">
                <FiSettings />
                Settings
              </button>
              <div className={styles.dropdownDivider} />
              <button
                className={`${styles.dropdownItem} ${styles.dropdownLogout}`}
                onClick={handleLogout}
                role="menuitem"
                id="logout-btn"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

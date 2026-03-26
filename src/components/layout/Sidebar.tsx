import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import styles from './Sidebar.module.css';

const navItems = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="7" height="7" rx="1" />
        <rect x="11" y="2" width="7" height="7" rx="1" />
        <rect x="2" y="11" width="7" height="7" rx="1" />
        <rect x="11" y="11" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    path: '/users',
    label: 'Users',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="6" r="3.5" />
        <path d="M3 17.5c0-3.5 3.1-6 7-6s7 2.5 7 6" />
      </svg>
    ),
  },
  {
    path: '/projects',
    label: 'Projects',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 5a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
      </svg>
    ),
  },
  {
    path: '/map',
    label: 'Map',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 17s-6-4.35-6-8.5a6 6 0 1112 0c0 4.15-6 8.5-6 8.5z" />
        <circle cx="10" cy="8.5" r="2" />
      </svg>
    ),
  },
  {
    path: '/themes',
    label: 'Themes',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="7.5" />
        <path d="M10 2.5v15" />
        <path d="M2.5 10h15" />
        <circle cx="10" cy="10" r="3" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.logo}>
        {!collapsed && <span className={styles.logoText}>AI/UI Lab</span>}
        <button
          className={styles.collapseBtn}
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {collapsed ? (
              <polyline points="6 3 11 8 6 13" />
            ) : (
              <polyline points="10 3 5 8 10 13" />
            )}
          </svg>
        </button>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
            title={collapsed ? item.label : undefined}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className={styles.account}>
        <div className={styles.accountAvatar}>
          <span className={styles.accountInitials}>JD</span>
        </div>
        {!collapsed && (
          <div className={styles.accountInfo}>
            <span className={styles.accountName}>Jane Doe</span>
            <span className={styles.accountEmail}>jane@example.com</span>
          </div>
        )}
      </div>
    </aside>
  );
}

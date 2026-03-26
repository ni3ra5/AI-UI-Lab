import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
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

const upcomingItems = [
  {
    label: 'Analytics',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 15 7 9 11 12 17 5" />
        <polyline points="14 5 17 5 17 8" />
      </svg>
    ),
  },
  {
    label: 'Integrations',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 3v4a2 2 0 01-2 2H3" />
        <path d="M13 3v4a2 2 0 002 2h2" />
        <path d="M7 17v-4a2 2 0 012-2h2a2 2 0 012 2v4" />
        <line x1="3" y1="10" x2="17" y2="10" />
      </svg>
    ),
  },
  {
    label: 'Settings',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="3" />
        <path d="M10 1.5v2M10 16.5v2M3.5 5l1.5 1M15 14l1.5 1M1.5 10h2M16.5 10h2M3.5 15l1.5-1M15 6l1.5-1" />
      </svg>
    ),
  },
];

const bottomItems = [
  {
    label: 'Help',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="8" />
        <path d="M7.5 7.5a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 3.5" />
        <circle cx="10" cy="14.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Changelog',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="2" width="14" height="16" rx="2" />
        <line x1="7" y1="6" x2="13" y2="6" />
        <line x1="7" y1="10" x2="13" y2="10" />
        <line x1="7" y1="14" x2="10" y2="14" />
      </svg>
    ),
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const { theme } = useTheme();
  const activeStyle = theme.components.sidebar.activeStyle ?? 'filled';

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.logo}>
        {!collapsed && <span className={styles.logoText}>AI/UI Lab</span>}
        <button
          className={styles.collapseBtn}
          onClick={onToggle}
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
            className={`${styles.navItem} ${location.pathname === item.path ? `${styles.active} ${styles[activeStyle] ?? ''}` : ''}`}
            title={collapsed ? item.label : undefined}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
          </NavLink>
        ))}

        {upcomingItems.map((item) => (
          <div
            key={item.label}
            className={styles.disabledItem}
            title={collapsed ? `${item.label} (Coming soon)` : undefined}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            {!collapsed && (
              <>
                <span className={styles.navLabel}>{item.label}</span>
                <span className={styles.soonBadge}>Soon</span>
              </>
            )}
          </div>
        ))}
      </nav>

      <div className={styles.bottomNav}>
        {bottomItems.map((item) => (
          <div
            key={item.label}
            className={styles.bottomItem}
            title={collapsed ? item.label : undefined}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
          </div>
        ))}
      </div>

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

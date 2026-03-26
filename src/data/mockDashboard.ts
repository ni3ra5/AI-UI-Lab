export interface KPI {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
}

export const kpis: KPI[] = [
  { label: 'Total Users', value: '12,847', change: 12.5, trend: 'up' },
  { label: 'Active Projects', value: '48', change: 8.2, trend: 'up' },
  { label: 'Revenue', value: '$284,320', change: 15.3, trend: 'up' },
  { label: 'Uptime', value: '99.97%', change: -0.02, trend: 'down' },
];

export interface TimeSeriesPoint {
  month: string;
  revenue: number;
  users: number;
}

export const timeSeriesData: TimeSeriesPoint[] = [
  { month: 'Apr', revenue: 18200, users: 8400 },
  { month: 'May', revenue: 19800, users: 8900 },
  { month: 'Jun', revenue: 21500, users: 9300 },
  { month: 'Jul', revenue: 20100, users: 9100 },
  { month: 'Aug', revenue: 22800, users: 9800 },
  { month: 'Sep', revenue: 24200, users: 10200 },
  { month: 'Oct', revenue: 23100, users: 10500 },
  { month: 'Nov', revenue: 25600, users: 11100 },
  { month: 'Dec', revenue: 27800, users: 11600 },
  { month: 'Jan', revenue: 26500, users: 12000 },
  { month: 'Feb', revenue: 28100, users: 12400 },
  { month: 'Mar', revenue: 28430, users: 12847 },
];

export interface CategoryData {
  name: string;
  projects: number;
}

export const categoryData: CategoryData[] = [
  { name: 'Engineering', projects: 14 },
  { name: 'Design', projects: 9 },
  { name: 'Marketing', projects: 7 },
  { name: 'Sales', projects: 6 },
  { name: 'Operations', projects: 5 },
  { name: 'Support', projects: 4 },
  { name: 'Research', projects: 3 },
];

export interface ActivityItem {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  timestamp: string;
}

export const activityFeed: ActivityItem[] = [
  { id: 'act-01', user: 'Emma Anderson', avatar: 'EA', action: 'completed', target: 'Brand Redesign milestone 3', timestamp: '2 minutes ago' },
  { id: 'act-02', user: 'Noah Patel', avatar: 'NP', action: 'deployed', target: 'API v3 beta to staging', timestamp: '15 minutes ago' },
  { id: 'act-03', user: 'Olivia Kim', avatar: 'OK', action: 'commented on', target: 'Mobile App Launch PR #247', timestamp: '32 minutes ago' },
  { id: 'act-04', user: 'Liam Chen', avatar: 'LC', action: 'created', target: 'new design tokens document', timestamp: '1 hour ago' },
  { id: 'act-05', user: 'Sophia Williams', avatar: 'SW', action: 'resolved', target: 'critical bug in payment flow', timestamp: '1 hour ago' },
  { id: 'act-06', user: 'James Johnson', avatar: 'JJ', action: 'merged', target: 'PR #243 into main branch', timestamp: '2 hours ago' },
  { id: 'act-07', user: 'Ava Davis', avatar: 'AD', action: 'updated', target: 'project roadmap Q2 2026', timestamp: '2 hours ago' },
  { id: 'act-08', user: 'Lucas Martinez', avatar: 'LM', action: 'started', target: 'Sprint 14 planning session', timestamp: '3 hours ago' },
  { id: 'act-09', user: 'Isabella Brown', avatar: 'IB', action: 'approved', target: 'Design System v2 RFC', timestamp: '3 hours ago' },
  { id: 'act-10', user: 'Mason Taylor', avatar: 'MT', action: 'assigned', target: 'security audit follow-ups to team', timestamp: '4 hours ago' },
  { id: 'act-11', user: 'Mia Wilson', avatar: 'MW', action: 'published', target: 'API documentation update', timestamp: '4 hours ago' },
  { id: 'act-12', user: 'Ethan Lee', avatar: 'EL', action: 'closed', target: 'issue #182 as resolved', timestamp: '5 hours ago' },
  { id: 'act-13', user: 'Charlotte Garcia', avatar: 'CG', action: 'pushed', target: '12 commits to feature/onboarding', timestamp: '5 hours ago' },
  { id: 'act-14', user: 'Logan Rodriguez', avatar: 'LR', action: 'created', target: 'new monitoring dashboard', timestamp: '6 hours ago' },
  { id: 'act-15', user: 'Amelia Clark', avatar: 'AC', action: 'reviewed', target: 'accessibility audit report', timestamp: '6 hours ago' },
  { id: 'act-16', user: 'Alexander Lewis', avatar: 'AL', action: 'upgraded', target: 'Kubernetes cluster to 1.29', timestamp: '7 hours ago' },
  { id: 'act-17', user: 'Harper Walker', avatar: 'HW', action: 'fixed', target: 'CSS regression on settings page', timestamp: '8 hours ago' },
  { id: 'act-18', user: 'Benjamin Hall', avatar: 'BH', action: 'archived', target: '6 completed sprint items', timestamp: '9 hours ago' },
  { id: 'act-19', user: 'Evelyn Young', avatar: 'EY', action: 'tagged', target: 'release v3.2.1 for deployment', timestamp: '10 hours ago' },
  { id: 'act-20', user: 'Daniel Allen', avatar: 'DA', action: 'added', target: 'SSO provider configuration', timestamp: '11 hours ago' },
];

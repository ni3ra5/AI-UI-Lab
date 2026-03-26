import { useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { kpis, timeSeriesData, categoryData, activityFeed } from '@/data/mockDashboard';
import { getChartColorsFromTheme } from '@/lib/chartUtils';
import { useTheme } from '@/hooks/useTheme';
import styles from './DashboardPage.module.css';

export function DashboardPage() {
  const { theme } = useTheme();

  const colors = useMemo(() => getChartColorsFromTheme(theme), [theme]);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Dashboard</h1>

      <div className={styles.kpiGrid}>
        {kpis.map((kpi) => (
          <Card key={kpi.label} className={styles.kpiCard}>
            <span className={styles.kpiLabel}>{kpi.label}</span>
            <span className={styles.kpiValue}>{kpi.value}</span>
            <span className={`${styles.kpiChange} ${kpi.trend === 'up' ? styles.up : styles.down}`}>
              {kpi.trend === 'up' ? '+' : ''}{kpi.change}%
            </span>
          </Card>
        ))}
      </div>

      <div className={styles.chartsRow}>
        <Card className={styles.chartCard}>
          <h3 className={styles.cardTitle}>Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
              <XAxis dataKey="month" stroke={colors.textMuted} fontSize={12} />
              <YAxis stroke={colors.textMuted} fontSize={12} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: '8px' }}
                labelStyle={{ color: colors.text }}
              />
              <Line type="monotone" dataKey="revenue" stroke={colors.primary} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className={styles.chartCard}>
          <h3 className={styles.cardTitle}>Projects by Department</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
              <XAxis dataKey="name" stroke={colors.textMuted} fontSize={12} />
              <YAxis stroke={colors.textMuted} fontSize={12} />
              <Tooltip
                contentStyle={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: '8px' }}
                labelStyle={{ color: colors.text }}
              />
              <Bar dataKey="projects" fill={colors.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className={styles.activityCard}>
        <h3 className={styles.cardTitle}>Recent Activity</h3>
        <div className={styles.activityList}>
          {activityFeed.map((item) => (
            <div key={item.id} className={styles.activityItem}>
              <Avatar name={item.user} size="sm" />
              <div className={styles.activityContent}>
                <span>
                  <strong>{item.user}</strong> {item.action} <strong>{item.target}</strong>
                </span>
                <span className={styles.activityTime}>{item.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

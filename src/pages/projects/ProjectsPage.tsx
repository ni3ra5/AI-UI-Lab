import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Avatar } from '@/components/ui/Avatar';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { mockProjects, type Project } from '@/data/mockProjects';
import styles from './ProjectsPage.module.css';

const statusVariant = (s: Project['status']) => {
  if (s === 'Active') return 'info' as const;
  if (s === 'Completed') return 'success' as const;
  if (s === 'At Risk') return 'error' as const;
  return 'warning' as const;
};

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'Active', label: 'Active' },
  { value: 'Completed', label: 'Completed' },
  { value: 'On Hold', label: 'On Hold' },
  { value: 'At Risk', label: 'At Risk' },
];

const allTags = Array.from(new Set(mockProjects.flatMap((p) => p.tags))).sort();
const tagOptions = [{ value: '', label: 'All Tags' }, ...allTags.map((t) => ({ value: t, label: t }))];

export function ProjectsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [view, setView] = useState<'grid' | 'table'>('grid');

  const filtered = useMemo(() => {
    return mockProjects.filter((p) => {
      const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = !statusFilter || p.status === statusFilter;
      const matchesTag = !tagFilter || p.tags.includes(tagFilter);
      return matchesSearch && matchesStatus && matchesTag;
    });
  }, [search, statusFilter, tagFilter]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Projects</h1>
        <div className={styles.headerRight}>
          <div className={styles.viewToggle}>
            <button className={`${styles.viewBtn} ${view === 'grid' ? styles.activeView : ''}`} onClick={() => setView('grid')} aria-label="Grid view">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="1" width="5.5" height="5.5" rx="1"/><rect x="9.5" y="1" width="5.5" height="5.5" rx="1"/><rect x="1" y="9.5" width="5.5" height="5.5" rx="1"/><rect x="9.5" y="9.5" width="5.5" height="5.5" rx="1"/></svg>
            </button>
            <button className={`${styles.viewBtn} ${view === 'table' ? styles.activeView : ''}`} onClick={() => setView('table')} aria-label="Table view">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="1" y1="3" x2="15" y2="3"/><line x1="1" y1="8" x2="15" y2="8"/><line x1="1" y1="13" x2="15" y2="13"/></svg>
            </button>
          </div>
          <Button variant="primary" size="md">New Project</Button>
        </div>
      </div>

      <div className={styles.filters}>
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5L14 14" />
            </svg>
          }
        />
        <Select options={statusOptions} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} />
        <Select options={tagOptions} value={tagFilter} onChange={(e) => setTagFilter(e.target.value)} />
      </div>

      {view === 'grid' ? (
        <div className={styles.grid}>
          {filtered.map((project) => (
            <Card key={project.id} className={styles.projectCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.projectName}>{project.name}</h3>
                <Badge variant={statusVariant(project.status)}>{project.status}</Badge>
              </div>
              <p className={styles.projectDesc}>{project.description}</p>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="default">{tag}</Badge>
                ))}
              </div>
              <div className={styles.progress}>
                <div className={styles.progressLabel}>
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <ProgressBar value={project.progress} />
              </div>
              <div className={styles.cardFooter}>
                <div className={styles.teamAvatars}>
                  {project.team.slice(0, 3).map((member) => (
                    <Avatar key={member.name} name={member.name} size="sm" />
                  ))}
                  {project.team.length > 3 && (
                    <span className={styles.moreTeam}>+{project.team.length - 3}</span>
                  )}
                </div>
                <span className={styles.date}>
                  {new Date(project.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card noPadding>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Progress</th>
                  <th className={styles.th}>Tags</th>
                  <th className={styles.th}>Team</th>
                  <th className={styles.th}>Updated</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((project) => (
                  <tr key={project.id} className={styles.tr}>
                    <td className={styles.td}><strong>{project.name}</strong></td>
                    <td className={styles.td}><Badge variant={statusVariant(project.status)}>{project.status}</Badge></td>
                    <td className={styles.td} style={{ minWidth: 120 }}>
                      <div className={styles.progressCell}>
                        <ProgressBar value={project.progress} />
                        <span>{project.progress}%</span>
                      </div>
                    </td>
                    <td className={styles.td}>
                      <div className={styles.tags}>
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="default">{tag}</Badge>
                        ))}
                      </div>
                    </td>
                    <td className={styles.td}>
                      <div className={styles.teamAvatars}>
                        {project.team.slice(0, 3).map((m) => (
                          <Avatar key={m.name} name={m.name} size="sm" />
                        ))}
                        {project.team.length > 3 && <span className={styles.moreTeam}>+{project.team.length - 3}</span>}
                      </div>
                    </td>
                    <td className={styles.td}>{new Date(project.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

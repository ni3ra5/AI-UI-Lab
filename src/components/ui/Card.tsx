import type { HTMLAttributes } from 'react';
import { useTheme } from '@/hooks/useTheme';
import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

export function Card({ className, children, noPadding, ...props }: CardProps) {
  const { theme } = useTheme();
  const hoverEffect = theme.components.card.hoverEffect ?? 'lift';

  return (
    <div
      className={`${styles.card} ${styles[hoverEffect] ?? ''} ${noPadding ? styles.noPadding : ''} ${className ?? ''}`}
      {...props}
    >
      {children}
    </div>
  );
}

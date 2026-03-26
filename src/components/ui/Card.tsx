import type { HTMLAttributes } from 'react';
import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

export function Card({ className, children, noPadding, ...props }: CardProps) {
  return (
    <div
      className={`${styles.card} ${noPadding ? styles.noPadding : ''} ${className ?? ''}`}
      {...props}
    >
      {children}
    </div>
  );
}

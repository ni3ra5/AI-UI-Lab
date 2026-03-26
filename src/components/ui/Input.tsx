import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export function Input({ icon, className, ...props }: InputProps) {
  return (
    <div className={`${styles.wrapper} ${className ?? ''}`}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <input
        className={`${styles.input} ${icon ? styles.withIcon : ''}`}
        {...props}
      />
    </div>
  );
}

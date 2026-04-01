import { forwardRef } from 'react';
import styles from './Input.module.css';

export const Input = forwardRef(function Input(
  { className = '', error = false, as = 'input', ...props },
  ref
) {
  const Component = as;
  const classNames = [
    styles.input,
    as === 'textarea' && styles.textarea,
    error && styles.error,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.inputWrapper}>
      <Component ref={ref} className={classNames} {...props} />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
});

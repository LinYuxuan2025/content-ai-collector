import styles from './Button.module.css';

export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  iconOnly = false,
  disabled = false,
  className = '',
  ...props
}) {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    iconOnly && styles.iconOnly,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={classNames} disabled={disabled} {...props}>
      {children}
    </button>
  );
}

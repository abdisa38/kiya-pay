import './common.css';

/**
 * Reusable Badge component for dietary tags, availability, and statuses.
 */
export default function Badge({
  children,
  variant = 'neutral',
  size = 'sm',
  icon: Icon,
  className = '',
}) {
  const classes = [
    'badge',
    `badge-${variant}`,
    `badge-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      {Icon && <Icon size={12} className="badge-icon" />}
      <span>{children}</span>
    </span>
  );
}

import './common.css';

/**
 * Reusable Button component for GebetaQR.
 * Supports primary, secondary, outline, gold, danger variants with loading states.
 */
export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  onClick,
  className = '',
  ...props
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? 'btn-full' : '',
    loading ? 'btn-loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className="btn-spinner" aria-hidden="true" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 16 : 18} className="btn-icon" />}
          <span className="btn-text">{children}</span>
          {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 16 : 18} className="btn-icon" />}
        </>
      )}
    </button>
  );
}

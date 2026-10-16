import './common.css';

/**
 * Reusable Loading Spinner for data loading states.
 */
export default function LoadingSpinner({ text = 'Loading delicious menu...', size = 'md' }) {
  return (
    <div className={`spinner-container spinner-${size}`} role="status" aria-live="polite">
      <div className="spinner-ring" />
      {text && <p className="spinner-text">{text}</p>}
      <span className="sr-only">{text}</span>
    </div>
  );
}

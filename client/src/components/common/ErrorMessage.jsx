import './common.css';
import { AlertCircle, RotateCcw } from 'lucide-react';
import Button from './Button';

/**
 * Reusable ErrorMessage component for graceful failure presentation.
 */
export default function ErrorMessage({
  title = 'Something went wrong',
  message,
  onRetry,
  className = '',
}) {
  return (
    <div className={`error-card ${className}`} role="alert">
      <div className="error-icon-wrapper">
        <AlertCircle size={28} className="error-icon" />
      </div>
      <div className="error-content">
        <h3 className="error-title">{title}</h3>
        {message && <p className="error-message">{message}</p>}
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            icon={RotateCcw}
            onClick={onRetry}
            className="error-retry-btn"
          >
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}

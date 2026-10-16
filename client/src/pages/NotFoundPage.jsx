import { Link } from 'react-router-dom';
import { UtensilsCrossed, ArrowLeft, ExternalLink } from 'lucide-react';
import '../components/common/common.css';

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '520px',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-2xl)',
          padding: '48px 32px',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}
        >
          <UtensilsCrossed size={32} />
        </div>

        <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: '8px' }}>Page Not Found</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', fontSize: 'var(--text-sm)' }}>
          The digital menu or page you are looking for does not exist or may have moved.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link to="/r/buna-bite?t=DEMO-TABLE-04" className="btn btn-primary btn-lg btn-full">
            <ExternalLink size={18} /> Open Live Demo Menu
          </Link>
          <Link to="/" className="btn btn-secondary btn-md btn-full">
            <ArrowLeft size={16} /> Return to GebetaQR Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

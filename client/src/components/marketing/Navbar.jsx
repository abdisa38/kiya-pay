import { Link } from 'react-router-dom';
import { QrCode, ArrowRight } from 'lucide-react';
import './marketing.css';

export default function Navbar() {
  return (
    <header className="marketing-nav-header">
      <div className="container marketing-nav-inner">
        <Link to="/" className="marketing-brand">
          <div className="marketing-logo-icon">
            <QrCode size={22} />
          </div>
          <div className="marketing-brand-text">
            <span className="brand-title">GebetaQR</span>
            <span className="brand-subtitle">Modern Hospitality</span>
          </div>
        </Link>

        <nav className="marketing-nav-links" aria-label="Main Navigation">
          <a href="#features" className="nav-link">Features</a>
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#enquiry" className="nav-link">Get Started</a>
        </nav>

        <div className="marketing-nav-actions">
          <Link
            to="/r/buna-bite?t=DEMO-TABLE-04"
            className="btn btn-primary btn-sm nav-demo-cta"
          >
            <span>Try Live Demo</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </header>
  );
}

import { Link } from 'react-router-dom';
import { QrCode, Heart } from 'lucide-react';
import './marketing.css';

export default function Footer() {
  return (
    <footer className="marketing-footer">
      <div className="container footer-inner">
        <div className="footer-brand-col">
          <div className="marketing-brand">
            <div className="marketing-logo-icon">
              <QrCode size={20} />
            </div>
            <span className="brand-title">GebetaQR</span>
          </div>
          <p className="footer-desc">
            Digital QR menus and live table ordering engineered for Ethiopian hotels, restaurants, cafés, and lounges.
          </p>
          <p className="footer-heritage">
            Modern Hospitality, Rooted in Tradition • Addis Ababa, Ethiopia
          </p>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-col-title">Product</h4>
          <a href="#features">Digital QR Menus</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#pricing">Commercial Pricing</a>
          <Link to="/r/buna-bite?t=DEMO-TABLE-04">Live Interactive Menu Demo</Link>
          <Link to="/r/buna-view-only">View-Only Mode Demo</Link>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-col-title">Platform</h4>
          <a href="#enquiry">Request Onboarding</a>
          <span className="footer-muted">Addis Ababa • Hawassa • Adama • Bishoftu</span>
          <span className="footer-muted">Manual Cash &amp; Telebirr Compatible</span>
        </div>
      </div>

      <div className="container footer-bottom-bar">
        <p>© {new Date().getFullYear()} GebetaQR. Commercial Hospitality Technology. All rights reserved.</p>
        <p className="footer-credit">
          Crafted with care for Ethiopian dining hospitality <Heart size={14} color="#C69234" style={{ display: 'inline', verticalAlign: 'middle' }} />
        </p>
      </div>
    </footer>
  );
}

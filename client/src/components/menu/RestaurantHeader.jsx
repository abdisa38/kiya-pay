import { Clock, MapPin, Phone, AlertTriangle, Info, QrCode } from 'lucide-react';
import Badge from '../common/Badge';
import './menu.css';

export default function RestaurantHeader({ restaurant, tableNumber }) {
  if (!restaurant) return null;

  return (
    <header className="restaurant-header">
      {/* Cover Image */}
      <div className="restaurant-cover-wrapper">
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          className="restaurant-cover-img"
          loading="eager"
        />
        <div className="restaurant-cover-overlay" />
      </div>

      <div className="restaurant-info-card">
        <div className="restaurant-brand-row">
          <div className="restaurant-logo-badge">
            <span>{restaurant.logoText || 'QR'}</span>
          </div>
          <div className="restaurant-meta-main">
            <h1 className="restaurant-title">{restaurant.name}</h1>
            <p className="restaurant-tagline">{restaurant.tagline}</p>
          </div>
        </div>

        {/* Table Indicator if scanned via table QR */}
        {tableNumber && (
          <div className="table-badge-bar">
            <div className="table-badge-inner">
              <QrCode size={16} className="table-badge-icon" />
              <span>Ordering for <strong>Table: {tableNumber}</strong></span>
            </div>
            <Badge variant="gold" size="sm">Dine-in</Badge>
          </div>
        )}

        {/* View-Only Mode Alert Banner */}
        {!restaurant.orderingEnabled && (
          <div className="view-only-banner">
            <AlertTriangle size={18} className="view-only-icon" />
            <div className="view-only-text">
              <strong>View-Only Menu:</strong> {restaurant.viewOnlyNotice || 'Ordering is currently handled directly by your floor server.'}
            </div>
          </div>
        )}

        {/* Demo Mode Notice */}
        <div className="demo-pill-notice">
          <Info size={14} />
          <span>GebetaQR Demo Preview • No real charges</span>
        </div>

        {/* Quick Venue Meta */}
        <div className="restaurant-meta-grid">
          {restaurant.operatingHours && (
            <div className="meta-item">
              <Clock size={14} className="meta-icon" />
              <span>{restaurant.operatingHours}</span>
            </div>
          )}
          {restaurant.location && (
            <div className="meta-item">
              <MapPin size={14} className="meta-icon" />
              <span>{restaurant.location}</span>
            </div>
          )}
          {restaurant.phone && (
            <div className="meta-item">
              <Phone size={14} className="meta-icon" />
              <a href={`tel:${restaurant.phone}`}>{restaurant.phone}</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

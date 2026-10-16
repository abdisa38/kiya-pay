import { useState } from 'react';
import { Plus, Eye, ImageOff } from 'lucide-react';
import { formatETB } from '../../utils/currency';
import Badge from '../common/Badge';
import './menu.css';

export default function FoodCard({
  item,
  onOpenDetails,
  onQuickAdd,
  orderingEnabled = true,
}) {
  const [imgError, setImgError] = useState(false);
  const hasModifiers = item.modifierGroups && item.modifierGroups.length > 0;

  const handleActionClick = (e) => {
    e.stopPropagation();
    if (!item.isAvailable) return;

    if (!orderingEnabled || hasModifiers) {
      onOpenDetails(item);
    } else {
      onQuickAdd(item);
    }
  };

  return (
    <article
      className={`food-card ${!item.isAvailable ? 'food-card-unavailable' : ''}`}
      onClick={() => onOpenDetails(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenDetails(item);
        }
      }}
      aria-label={`${item.name}, ${formatETB(item.price)}`}
    >
      {/* Image Container with Fallback */}
      <div className="food-card-image-wrap">
        {!imgError && item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="food-card-img"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="food-card-fallback">
            <ImageOff size={24} className="fallback-icon" />
            <span>GebetaQR Dish</span>
          </div>
        )}

        {/* Dietary / Special Tag */}
        {item.dietary?.label && (
          <div className="food-card-tag">
            <Badge
              variant={item.dietary.isFasting ? 'success' : 'gold'}
              size="sm"
            >
              {item.dietary.label}
            </Badge>
          </div>
        )}

        {/* Out of Stock Overlay */}
        {!item.isAvailable && (
          <div className="unavailable-overlay">
            <Badge variant="error" size="sm">
              Sold Out Today
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="food-card-body">
        <div className="food-card-header">
          <h3 className="food-card-title">{item.name}</h3>
          <p className="food-card-desc">{item.description}</p>
        </div>

        <div className="food-card-footer">
          <div className="food-card-price-group">
            <span className="price-tag">{formatETB(item.price)}</span>
            {hasModifiers && <span className="mod-hint">Customizable</span>}
          </div>

          {orderingEnabled ? (
            <button
              type="button"
              className={`food-card-btn ${!item.isAvailable ? 'btn-disabled' : ''}`}
              disabled={!item.isAvailable}
              onClick={handleActionClick}
              aria-label={hasModifiers ? `Customize ${item.name}` : `Add ${item.name} to order`}
            >
              {hasModifiers ? (
                <span>Options</span>
              ) : (
                <>
                  <Plus size={16} />
                  <span>Add</span>
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              className="food-card-btn btn-view"
              onClick={handleActionClick}
              aria-label={`View details for ${item.name}`}
            >
              <Eye size={16} />
              <span>Details</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

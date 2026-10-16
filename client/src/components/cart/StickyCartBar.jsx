import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import { formatETB } from '../../utils/currency';
import './cart.css';

export default function StickyCartBar({ restaurantSlug }) {
  const { totalItemCount, subtotal } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  if (totalItemCount === 0) return null;

  const handleCheckoutClick = () => {
    // Preserve any existing query parameters (like ?t=DEMO-TABLE-04)
    navigate({
      pathname: `/r/${restaurantSlug}/cart`,
      search: location.search,
    });
  };

  return (
    <aside className="sticky-cart-container" aria-label="Order summary bar">
      <div className="sticky-cart-inner">
        <div className="sticky-cart-meta">
          <div className="sticky-cart-icon-wrap">
            <ShoppingBag size={20} />
            <span className="sticky-cart-count-badge" aria-label={`${totalItemCount} items`}>
              {totalItemCount}
            </span>
          </div>
          <div className="sticky-cart-text">
            <span className="sticky-cart-label">Your Order</span>
            <span className="sticky-cart-total">{formatETB(subtotal)}</span>
          </div>
        </div>

        <button
          type="button"
          className="sticky-cart-action-btn"
          onClick={handleCheckoutClick}
        >
          <span>View Cart</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </aside>
  );
}

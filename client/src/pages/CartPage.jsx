import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingBag,
  QrCode,
  DollarSign,
  AlertCircle,
  FileText,
  CheckCircle,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { restaurantService } from '../services/restaurantService';
import { orderService } from '../services/orderService';
import { formatETB } from '../utils/currency';
import { generateIdempotencyKey } from '../utils/idempotency';
import CartItemRow from '../components/cart/CartItemRow';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import LoadingSpinner from '../components/common/LoadingSpinner';
import '../components/cart/cart.css';

export default function CartPage() {
  const { restaurantSlug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const urlTable = searchParams.get('t') || searchParams.get('table') || '';
  const [tableNumber, setTableNumber] = useState(urlTable || 'Table 04');
  const [customerNotes, setCustomerNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [restaurant, setRestaurant] = useState(null);
  const [loadingRestaurant, setLoadingRestaurant] = useState(true);

  const { items, subtotal, totalItemCount, updateQuantity, removeItem, clearCart } = useCart();

  useEffect(() => {
    restaurantService
      .getRestaurantBySlug(restaurantSlug)
      .then((data) => {
        setRestaurant(data);
        setLoadingRestaurant(false);
      })
      .catch(() => {
        setLoadingRestaurant(false);
      });
  }, [restaurantSlug]);

  // Keep table number in sync if url parameter changes
  useEffect(() => {
    if (urlTable) {
      setTableNumber(urlTable);
    }
  }, [urlTable]);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!tableNumber.trim()) {
      setSubmitError('Please specify your table number so staff know where to serve you.');
      return;
    }

    if (items.length === 0) {
      setSubmitError('Your cart is empty.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const idempotencyKey = generateIdempotencyKey();

      const createdOrder = await orderService.submitDemoOrder({
        idempotencyKey,
        restaurantSlug,
        restaurantName: restaurant?.name || 'Restaurant',
        tableNumber: tableNumber.trim(),
        items,
        subtotal,
        tax: 0,
        total: subtotal,
        currency: 'ETB',
        customerNotes,
        paymentMethod: 'Pay to Server / Counter',
      });

      // Clear the cart on successful demo order creation
      clearCart();

      // Navigate to order confirmation
      navigate(`/r/${restaurantSlug}/order/${createdOrder.orderId}?t=${encodeURIComponent(tableNumber.trim())}`);
    } catch (err) {
      setSubmitError(err.message || 'Failed to submit order. Please check connection and try again.');
      setIsSubmitting(false);
    }
  };

  if (loadingRestaurant) {
    return (
      <div className="menu-container" style={{ paddingTop: '60px' }}>
        <LoadingSpinner text="Loading order checkout..." />
      </div>
    );
  }

  return (
    <div className="menu-container cart-page-layout">
      {/* Return to menu header */}
      <Link
        to={`/r/${restaurantSlug}${urlTable ? `?t=${encodeURIComponent(urlTable)}` : ''}`}
        className="cart-nav-back"
      >
        <ArrowLeft size={16} />
        <span>Back to {restaurant?.name || 'Menu'}</span>
      </Link>

      <h1 className="cart-section-title" style={{ fontSize: 'var(--text-2xl)', marginBottom: '16px' }}>
        <span>Your Order Summary</span>
        <span className="price-tag" style={{ fontSize: 'var(--text-lg)' }}>
          {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
        </span>
      </h1>

      {items.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="You haven't selected any dishes or drinks yet. Browse the digital menu to add delicious items to your table order."
          actionLabel="Browse Digital Menu"
          onAction={() =>
            navigate(`/r/${restaurantSlug}${urlTable ? `?t=${encodeURIComponent(urlTable)}` : ''}`)
          }
        />
      ) : (
        <form onSubmit={handleOrderSubmit}>
          {/* Table Identification Card */}
          <div className="table-confirmation-box">
            <div className="table-confirm-info">
              <QrCode size={20} />
              <div>
                <strong>Dine-In Table:</strong>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)' }}>
                  Confirm your table number for server delivery
                </p>
              </div>
            </div>
            <input
              type="text"
              className="table-confirm-input"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="e.g. Table 04"
              required
              aria-label="Table number"
            />
          </div>

          {/* Cart Items List Card */}
          <div className="cart-card">
            <h2 className="cart-section-title">Selected Items</h2>
            <div className="cart-items-container">
              {items.map((item) => (
                <CartItemRow
                  key={item.cartItemId}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>

            {/* Price Summary Breakdown */}
            <div className="price-breakdown-list">
              <div className="price-breakdown-row">
                <span>Items Subtotal</span>
                <span>{formatETB(subtotal)}</span>
              </div>
              <div className="price-breakdown-row">
                <span>VAT &amp; Service Fee</span>
                <span>Included</span>
              </div>
              <div className="price-breakdown-row total-row">
                <span>Total Due</span>
                <span className="price-tag">{formatETB(subtotal)}</span>
              </div>
            </div>
          </div>

          {/* Order Notes Card */}
          <div className="cart-card">
            <div className="payment-inst-head">
              <FileText size={18} />
              <span>General Table Notes</span>
            </div>
            <p className="payment-inst-desc" style={{ marginBottom: '8px' }}>
              Any overall instructions for table service (e.g., serve drinks first, extra napkins).
            </p>
            <textarea
              className="prep-notes-textarea"
              rows={2}
              placeholder="Add optional notes for the staff..."
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              maxLength={200}
            />
          </div>

          {/* Payment Method Notice Box */}
          <div className="payment-instruction-box">
            <div className="payment-inst-head">
              <DollarSign size={18} color="var(--color-accent-gold)" />
              <span>Payment to Staff / Counter</span>
            </div>
            <p className="payment-inst-desc">
              No online card required. When your food is served at <strong>{tableNumber}</strong>,
              settle payment directly with your server using <strong>Cash</strong>,{' '}
              <strong>Telebirr</strong>, or <strong>CBE Birr</strong>.
            </p>
          </div>

          {/* Error Message if any */}
          {submitError && (
            <div className="modal-validation-error" style={{ marginBottom: '16px' }} role="alert">
              <AlertCircle size={16} />
              <span>{submitError}</span>
            </div>
          )}

          {/* Submit Order Action */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            icon={CheckCircle}
            loading={isSubmitting}
            disabled={isSubmitting || items.length === 0}
          >
            {isSubmitting ? 'Sending Order...' : `Confirm & Place Order • ${formatETB(subtotal)}`}
          </Button>

          <p
            style={{
              textAlign: 'center',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-secondary)',
              marginTop: '12px',
            }}
          >
            By confirming, your order will be simulated in local demonstration mode.
          </p>
        </form>
      )}
    </div>
  );
}

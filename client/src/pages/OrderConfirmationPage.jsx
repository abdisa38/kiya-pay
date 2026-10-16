import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {
  Check,
  ChefHat,
  Utensils,
  Clock,
  Info,
  PhoneCall,
  ArrowLeft,
  QrCode,
  DollarSign,
} from 'lucide-react';
import { orderService } from '../services/orderService';
import { formatETB } from '../utils/currency';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import Button from '../components/common/Button';
import '../components/cart/cart.css';

export default function OrderConfirmationPage() {
  const { restaurantSlug, orderId } = useParams();
  const [searchParams] = useSearchParams();
  const tableParam = searchParams.get('t') || searchParams.get('table') || '';

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    orderService
      .getOrderById(orderId)
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Order could not be found.');
        setLoading(false);
      });
  }, [orderId]);

  if (loading) {
    return (
      <div className="menu-container" style={{ paddingTop: '80px' }}>
        <LoadingSpinner text="Retrieving your order status..." />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="menu-container" style={{ paddingTop: '60px' }}>
        <ErrorMessage
          title="Order Not Found"
          message={error || `Could not find order ${orderId}. It may have expired from demonstration memory.`}
        />
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link
            to={`/r/${restaurantSlug}${tableParam ? `?t=${encodeURIComponent(tableParam)}` : ''}`}
            className="btn btn-primary btn-md"
          >
            Return to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-container confirmation-layout">
      <div className="confirmation-hero-card">
        {/* Animated Check Icon */}
        <div className="confirmation-badge-icon" aria-hidden="true">
          <Check size={40} strokeWidth={3} />
        </div>

        <h1 className="confirmation-title">Order Received!</h1>
        <p className="confirmation-order-num">Ticket #{order.orderId}</p>

        {/* Explicit Local Demonstration Disclaimer */}
        <div className="demo-order-warning" role="alert">
          <Info size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>Demonstration Simulation:</strong> {order.demoNotice}
            <div style={{ marginTop: '4px', opacity: 0.9 }}>
              In the live system (Prompt 5), this ticket instantly flashes and chimes on the kitchen
              terminal.
            </div>
          </div>
        </div>

        {/* Order Status Progress Pipeline */}
        <div className="order-steps-container">
          <div className="order-step-item active">
            <div className="step-indicator-bubble">
              <Check size={18} />
            </div>
            <span className="step-label">Received</span>
          </div>

          <div
            style={{
              flex: 1,
              height: '2px',
              backgroundColor: 'var(--color-border)',
              margin: '0 8px 18px',
            }}
          />

          <div className="order-step-item">
            <div className="step-indicator-bubble">
              <ChefHat size={18} />
            </div>
            <span className="step-label">Preparing</span>
          </div>

          <div
            style={{
              flex: 1,
              height: '2px',
              backgroundColor: 'var(--color-border)',
              margin: '0 8px 18px',
            }}
          />

          <div className="order-step-item">
            <div className="step-indicator-bubble">
              <Utensils size={18} />
            </div>
            <span className="step-label">Served</span>
          </div>
        </div>

        {/* Table & Meta Details */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-subdued)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            textAlign: 'left',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px',
              fontSize: 'var(--text-sm)',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)' }}>
              <QrCode size={16} /> <strong>{order.tableNumber}</strong>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-secondary)' }}>
              <Clock size={14} /> {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          {/* Items Summary */}
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '10px' }}>
            <h2 style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
              Items on this Ticket
            </h2>
            {order.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 'var(--text-sm)',
                  marginBottom: '6px',
                }}
              >
                <span>
                  <strong>{item.quantity}x</strong> {item.name}
                </span>
                <span style={{ fontWeight: '600' }}>{formatETB(item.subtotal)}</span>
              </div>
            ))}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: '1px dashed var(--color-border)',
                paddingTop: '8px',
                marginTop: '8px',
                fontSize: 'var(--text-base)',
                fontWeight: '800',
              }}
            >
              <span>Total Amount:</span>
              <span className="price-tag">{formatETB(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Payment Remind Box */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#F7F4EE',
            border: '1px solid #E4DEC8',
            borderRadius: 'var(--radius-md)',
            padding: '12px',
            fontSize: 'var(--text-xs)',
            textAlign: 'left',
            color: 'var(--color-text-primary)',
            marginBottom: '24px',
          }}
        >
          <DollarSign size={20} color="var(--color-accent-gold)" style={{ flexShrink: 0 }} />
          <span>
            Please pay <strong>{formatETB(order.total)}</strong> to your waiter via{' '}
            <strong>Cash</strong>, <strong>Telebirr</strong>, or <strong>CBE Birr</strong> when your
            order is served at <strong>{order.tableNumber}</strong>.
          </span>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link
            to={`/r/${restaurantSlug}${tableParam ? `?t=${encodeURIComponent(tableParam)}` : ''}`}
            className="btn btn-primary btn-md btn-full"
          >
            <ArrowLeft size={16} /> Order More Items
          </Link>

          <Button
            variant="secondary"
            size="md"
            icon={PhoneCall}
            onClick={() => alert('Demo Feature: In live deployment, this rings the waiter pager for your table!')}
          >
            Call Waiter to Table
          </Button>
        </div>
      </div>
    </div>
  );
}

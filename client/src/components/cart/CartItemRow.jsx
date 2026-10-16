import { Plus, Minus, Trash2 } from 'lucide-react';
import { formatETB } from '../../utils/currency';
import './cart.css';

export default function CartItemRow({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="cart-item-row">
      {item.imageUrl && (
        <img src={item.imageUrl} alt={item.name} className="cart-item-thumbnail" />
      )}

      <div className="cart-item-info">
        <div className="cart-item-head">
          <h4 className="cart-item-name">{item.name}</h4>
          <span className="cart-item-subtotal">{formatETB(item.subtotal)}</span>
        </div>

        {/* Selected Modifiers Pills */}
        {item.selectedModifiers && item.selectedModifiers.length > 0 && (
          <div className="cart-item-mods-list">
            {item.selectedModifiers.map((mod) => (
              <span key={mod.id} className="cart-mod-pill">
                {mod.name}
                {mod.priceAdded > 0 ? ` (+${formatETB(mod.priceAdded)})` : ''}
              </span>
            ))}
          </div>
        )}

        {/* Notes */}
        {item.prepNotes && (
          <p className="cart-item-notes">Note: &ldquo;{item.prepNotes}&rdquo;</p>
        )}

        {/* Quantity Controls & Remove */}
        <div className="cart-item-actions">
          <div className="cart-stepper">
            <button
              type="button"
              className="cart-stepper-btn"
              onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
              aria-label={`Decrease ${item.name} quantity`}
            >
              <Minus size={14} />
            </button>
            <span className="cart-stepper-qty">{item.quantity}</span>
            <button
              type="button"
              className="cart-stepper-btn"
              onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
              aria-label={`Increase ${item.name} quantity`}
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            type="button"
            className="cart-item-remove-btn"
            onClick={() => onRemove(item.cartItemId)}
            aria-label={`Remove ${item.name} from cart`}
          >
            <Trash2 size={16} />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}

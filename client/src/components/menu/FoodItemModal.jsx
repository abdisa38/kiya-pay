import { useState, useMemo, useEffect } from 'react';
import { Plus, Minus, Check, AlertCircle, ShoppingBag, Info } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { formatETB, calculateItemTotal } from '../../utils/currency';
import './menu.css';

export default function FoodItemModal({
  isOpen,
  onClose,
  item,
  onAddToCart,
  orderingEnabled = true,
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedModifiers, setSelectedModifiers] = useState({});
  const [prepNotes, setPrepNotes] = useState('');
  const [validationError, setValidationError] = useState('');

  // Reset local state when a new item is opened
  useEffect(() => {
    if (!item) return;

    setQuantity(1);
    setPrepNotes('');
    setValidationError('');

    // Pre-populate defaults for required single-select modifiers if available
    const initialMods = {};
    if (item.modifierGroups) {
      item.modifierGroups.forEach((group) => {
        if (group.required && group.options.length > 0) {
          // Default to first option
          initialMods[group.id] = [group.options[0]];
        } else {
          initialMods[group.id] = [];
        }
      });
    }
    setSelectedModifiers(initialMods);
  }, [item]);

  // Flatten selected modifiers list
  const flatSelectedModifiers = useMemo(() => {
    return Object.values(selectedModifiers).flat();
  }, [selectedModifiers]);

  // Calculate live item total
  const currentTotal = useMemo(() => {
    if (!item) return 0;
    return calculateItemTotal(item.price, flatSelectedModifiers, quantity);
  }, [item, flatSelectedModifiers, quantity]);

  if (!item) return null;

  // Single-select toggle (e.g., Spice Level, Meat Doneness)
  const handleSingleSelect = (groupId, option) => {
    setSelectedModifiers((prev) => ({
      ...prev,
      [groupId]: [option],
    }));
    setValidationError('');
  };

  // Multi-select toggle (e.g., Add-ons, Extra sides)
  const handleMultiSelect = (group, option) => {
    const currentList = selectedModifiers[group.id] || [];
    const exists = currentList.some((opt) => opt.id === option.id);

    let updated;
    if (exists) {
      updated = currentList.filter((opt) => opt.id !== option.id);
    } else {
      if (group.max && currentList.length >= group.max) {
        setValidationError(`You can select at most ${group.max} options for "${group.name}".`);
        return;
      }
      updated = [...currentList, option];
    }

    setSelectedModifiers((prev) => ({
      ...prev,
      [group.id]: updated,
    }));
    setValidationError('');
  };

  const handleAddClick = () => {
    // Validate all required groups
    if (item.modifierGroups) {
      for (const group of item.modifierGroups) {
        const selected = selectedModifiers[group.id] || [];
        if (group.required && selected.length === 0) {
          setValidationError(`Please select an option for "${group.name}".`);
          return;
        }
      }
    }

    onAddToCart(item, flatSelectedModifiers, quantity, prepNotes);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={item.name} maxWidth="600px">
      <div className="item-modal-content">
        {/* Large Media Header */}
        {item.imageUrl && (
          <div className="item-modal-image-wrap">
            <img src={item.imageUrl} alt={item.name} className="item-modal-img" />
            {item.dietary?.label && (
              <div className="item-modal-badge">
                <Badge variant={item.dietary.isFasting ? 'success' : 'gold'}>
                  {item.dietary.label}
                </Badge>
              </div>
            )}
          </div>
        )}

        <div className="item-modal-details">
          <div className="item-modal-heading-row">
            <div>
              <h2 className="item-modal-title">{item.name}</h2>
              <p className="item-modal-description">{item.description}</p>
            </div>
            <div className="item-modal-base-price">
              <span className="price-tag">{formatETB(item.price)}</span>
            </div>
          </div>

          {/* Validation Notice */}
          {validationError && (
            <div className="modal-validation-error" role="alert">
              <AlertCircle size={16} />
              <span>{validationError}</span>
            </div>
          )}

          {/* Modifier Groups */}
          {item.modifierGroups && item.modifierGroups.length > 0 && (
            <div className="item-modifiers-section">
              <h3 className="modifiers-section-title">Customize Your Order</h3>

              {item.modifierGroups.map((group) => {
                const isSingleSelect = group.max === 1;
                const currentGroupSelected = selectedModifiers[group.id] || [];

                return (
                  <fieldset key={group.id} className="modifier-group-fieldset">
                    <legend className="modifier-group-legend">
                      <div className="modifier-legend-main">
                        <span className="modifier-group-name">{group.name}</span>
                        {group.required ? (
                          <span className="modifier-req-tag required">Required • Pick 1</span>
                        ) : (
                          <span className="modifier-req-tag optional">
                            Optional {group.max ? `• Up to ${group.max}` : ''}
                          </span>
                        )}
                      </div>
                    </legend>

                    <div className="modifier-options-list">
                      {group.options.map((option) => {
                        const isSelected = currentGroupSelected.some((o) => o.id === option.id);

                        return (
                          <button
                            key={option.id}
                            type="button"
                            className={`modifier-option-btn ${isSelected ? 'selected' : ''}`}
                            onClick={() => {
                              if (isSingleSelect) {
                                handleSingleSelect(group.id, option);
                              } else {
                                handleMultiSelect(group, option);
                              }
                            }}
                          >
                            <div className="option-select-indicator">
                              {isSelected ? <Check size={14} /> : null}
                            </div>
                            <span className="option-name">{option.name}</span>
                            {option.priceAdded > 0 && (
                              <span className="option-price">+{formatETB(option.priceAdded)}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                );
              })}
            </div>
          )}

          {/* Preparation Notes */}
          {orderingEnabled && (
            <div className="prep-notes-group">
              <label htmlFor="prep-notes-input" className="prep-notes-label">
                Special Kitchen Instructions (Optional)
              </label>
              <textarea
                id="prep-notes-input"
                className="prep-notes-textarea"
                rows={2}
                placeholder="e.g. Extra hot, sauce on the side, well-cooked..."
                value={prepNotes}
                onChange={(e) => setPrepNotes(e.target.value)}
                maxLength={200}
              />
            </div>
          )}

          {/* Bottom Action Footer */}
          {orderingEnabled ? (
            <div className="item-modal-footer">
              <div className="quantity-stepper">
                <button
                  type="button"
                  className="stepper-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="stepper-value" aria-label={`Quantity: ${quantity}`}>
                  {quantity}
                </span>
                <button
                  type="button"
                  className="stepper-btn"
                  onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                  disabled={quantity >= 20}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>

              <Button
                variant="primary"
                size="lg"
                icon={ShoppingBag}
                onClick={handleAddClick}
                disabled={!item.isAvailable}
                className="add-to-cart-cta"
              >
                <span>Add to Order • {formatETB(currentTotal)}</span>
              </Button>
            </div>
          ) : (
            <div className="view-only-footer-notice">
              <Info size={18} />
              <span>
                This menu is in view-only mode. Please inform your waiter when you are ready to order.
              </span>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

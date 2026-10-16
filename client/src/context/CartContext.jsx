import { useState, useEffect, useMemo, useCallback } from 'react';
import { calculateItemTotal } from '../utils/currency';
import { CartContext } from './cartContextDefinition';

export function CartProvider({ children, currentRestaurantSlug }) {
  const storageKey = currentRestaurantSlug
    ? `gebeta_cart_${currentRestaurantSlug}`
    : 'gebeta_cart_default';

  // Load initial cart safely from LocalStorage
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // Ignored if corrupt or unavailable
    }
    return [];
  });

  const [notification, setNotification] = useState(null);

  // Sync to local storage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      // LocalStorage full or disabled
    }
  }, [items, storageKey]);

  // Dismiss notification toast automatically
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      setNotification(null);
    }, 2800);
    return () => clearTimeout(timer);
  }, [notification]);

  /**
   * Generates a stable unique key for a configured item based on its modifiers and notes.
   */
  const createCartItemKey = (itemId, selectedModifiers = [], prepNotes = '') => {
    const modKey = selectedModifiers
      .map((m) => m.id)
      .sort()
      .join('|');
    return `${itemId}__${modKey}__${prepNotes.trim().toLowerCase()}`;
  };

  /**
   * Adds an item to the cart or increments its quantity if the exact same configuration exists.
   */
  const addItem = useCallback((item, selectedModifiers = [], quantity = 1, prepNotes = '') => {
    const itemTotal = calculateItemTotal(item.price, selectedModifiers, 1);
    const cartItemId = createCartItemKey(item.id, selectedModifiers, prepNotes);

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((i) => i.cartItemId === cartItemId);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        const existing = updated[existingIndex];
        const newQty = existing.quantity + quantity;
        updated[existingIndex] = {
          ...existing,
          quantity: newQty,
          subtotal: calculateItemTotal(item.price, selectedModifiers, newQty),
        };
        return updated;
      }

      const newItem = {
        cartItemId,
        itemId: item.id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        dietary: item.dietary,
        selectedModifiers,
        prepNotes: prepNotes.trim(),
        quantity,
        unitTotal: itemTotal,
        subtotal: itemTotal * quantity,
      };

      return [...prevItems, newItem];
    });

    setNotification({
      message: `Added ${quantity}x "${item.name}" to cart`,
      type: 'success',
    });
  }, []);

  /**
   * Updates the quantity of a specific cart item.
   */
  const updateQuantity = useCallback((cartItemId, newQuantity) => {
    setItems((prevItems) => {
      if (newQuantity <= 0) {
        return prevItems.filter((i) => i.cartItemId !== cartItemId);
      }
      return prevItems.map((item) => {
        if (item.cartItemId === cartItemId) {
          return {
            ...item,
            quantity: newQuantity,
            subtotal: item.unitTotal * newQuantity,
          };
        }
        return item;
      });
    });
  }, []);

  /**
   * Removes an item from the cart completely.
   */
  const removeItem = useCallback((cartItemId) => {
    setItems((prevItems) => prevItems.filter((i) => i.cartItemId !== cartItemId));
  }, []);

  /**
   * Clears the active restaurant cart.
   */
  const clearCart = useCallback(() => {
    setItems([]);
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // Ignored
    }
  }, [storageKey]);

  // Derived totals
  const totalItemCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.subtotal, 0);
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      totalItemCount,
      subtotal,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      notification,
      clearNotification: () => setNotification(null),
    }),
    [items, totalItemCount, subtotal, addItem, updateQuantity, removeItem, clearCart, notification]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;

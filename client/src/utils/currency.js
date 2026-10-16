/**
 * Formats a numerical amount into Ethiopian Birr (ETB) display format.
 *
 * @param {number} amount - The numerical amount in ETB.
 * @param {boolean} showDecimals - Whether to force two decimal places (default: false for clean integer prices).
 * @returns {string} Formatted string e.g., "350 ETB" or "350.50 ETB"
 */
export function formatETB(amount, showDecimals = false) {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '0 ETB';
  }

  const hasDecimals = amount % 1 !== 0;

  const formattedNumber = new Intl.NumberFormat('en-ET', {
    minimumFractionDigits: showDecimals || hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${formattedNumber} ETB`;
}

/**
 * Calculates subtotal for an item including its selected modifiers.
 *
 * @param {number} basePrice - Base price of the menu item.
 * @param {Array} selectedModifiers - List of modifier objects with priceAdded property.
 * @param {number} quantity - Number of items.
 * @returns {number}
 */
export function calculateItemTotal(basePrice, selectedModifiers = [], quantity = 1) {
  const modifiersCost = selectedModifiers.reduce(
    (sum, mod) => sum + (Number(mod.priceAdded) || 0),
    0
  );
  return (basePrice + modifiersCost) * quantity;
}

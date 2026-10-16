/**
 * Generates a unique client-side idempotency key for order placement sessions.
 * Prevents accidental double orders when connection stutters.
 */
export function generateIdempotencyKey() {
  return 'ord_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
}

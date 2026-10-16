import { generateIdempotencyKey } from '../utils/idempotency';

const DEMO_ORDERS_STORAGE_KEY = 'gebeta_demo_orders';

/**
 * Service to manage client-side demonstration orders.
 * Will swap to Express REST endpoints `POST /api/v1/public/orders` in later prompts.
 */
export const orderService = {
  /**
   * Submits a demonstration order and persists it to local storage.
   *
   * @param {Object} orderPayload
   * @returns {Promise<Object>} The created order record
   */
  async submitDemoOrder(orderPayload) {
    // Simulate brief network delay
    await new Promise((resolve) => setTimeout(resolve, 350));

    const existingOrders = this.getAllDemoOrders();
    const orderNumber = (existingOrders.length + 101).toString().padStart(4, '0');
    const orderId = `GB-${orderNumber}`;

    const newOrder = {
      orderId,
      idempotencyKey: orderPayload.idempotencyKey || generateIdempotencyKey(),
      restaurantSlug: orderPayload.restaurantSlug,
      restaurantName: orderPayload.restaurantName,
      tableNumber: orderPayload.tableNumber || 'Unassigned Table',
      items: orderPayload.items,
      subtotal: orderPayload.subtotal,
      tax: orderPayload.tax || 0,
      total: orderPayload.total,
      currency: orderPayload.currency || 'ETB',
      customerNotes: orderPayload.customerNotes || '',
      paymentMethod: orderPayload.paymentMethod || 'Pay to Staff / Counter',
      paymentStatus: 'Unpaid (Direct Settlement)',
      status: 'received', // 'received' -> 'preparing' -> 'served'
      createdAt: new Date().toISOString(),
      isDemo: true,
      demoNotice: 'Demonstration Order: This order was simulated locally in your browser. No kitchen ticket was created.',
    };

    existingOrders.unshift(newOrder);
    try {
      localStorage.setItem(DEMO_ORDERS_STORAGE_KEY, JSON.stringify(existingOrders.slice(0, 20)));
    } catch {
      // Local storage quota or unavailable
    }

    return newOrder;
  },

  /**
   * Retrieves an order by its orderId.
   */
  async getOrderById(orderId) {
    await new Promise((resolve) => setTimeout(resolve, 80));
    const orders = this.getAllDemoOrders();
    const found = orders.find((o) => o.orderId === orderId);
    if (!found) {
      throw new Error(`Order ${orderId} not found.`);
    }
    return found;
  },

  getAllDemoOrders() {
    try {
      const stored = localStorage.getItem(DEMO_ORDERS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },
};

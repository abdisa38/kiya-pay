import { DEMO_RESTAURANTS } from '../data/demoRestaurant';

/**
 * Service to retrieve restaurant data.
 * Currently backed by local demonstration data; designed to seamlessly swap
 * to `fetch('/api/v1/public/restaurants/' + slug)` in subsequent prompts.
 */
export const restaurantService = {
  /**
   * Fetches restaurant profile, categories, and menu items by slug.
   *
   * @param {string} slug - The restaurant identifier slug (e.g., 'buna-bite')
   * @returns {Promise<Object>} Restaurant data
   */
  async getRestaurantBySlug(slug) {
    // Simulate brief network latency for realistic loading states
    await new Promise((resolve) => setTimeout(resolve, 120));

    const normalizedSlug = (slug || '').toLowerCase().trim();
    const restaurant = DEMO_RESTAURANTS[normalizedSlug];

    if (!restaurant) {
      throw new Error(`Restaurant "${slug}" not found.`);
    }

    return JSON.parse(JSON.stringify(restaurant));
  },
};

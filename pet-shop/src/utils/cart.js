// Cart management utility using localStorage
const CART_KEY = 'pet_shop_cart';

export const cart = {
  /**
   * Get all cart items
   */
  getItems() {
    try {
      const items = localStorage.getItem(CART_KEY);
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error('Error getting cart items:', error);
      return [];
    }
  },

  /**
   * Add item to cart
   * @param {Object} product - Product object
   * @param {number} quantity - Quantity to add
   */
  addItem(product, quantity = 1) {
    const items = this.getItems();
    const existingItem = items.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.image_url || product.image,
        category: product.category,
        quantity: quantity,
        sku: product.sku
      });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(items));
    return items;
  },

  /**
   * Update item quantity
   * @param {number} productId - Product ID
   * @param {number} quantity - New quantity
   */
  updateQuantity(productId, quantity) {
    const items = this.getItems();
    const item = items.find(item => item.id === productId);
    
    if (item) {
      if (quantity <= 0) {
        return this.removeItem(productId);
      }
      item.quantity = quantity;
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    }
    return items;
  },

  /**
   * Remove item from cart
   * @param {number} productId - Product ID
   */
  removeItem(productId) {
    const items = this.getItems().filter(item => item.id !== productId);
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    return items;
  },

  /**
   * Clear cart
   */
  clear() {
    localStorage.removeItem(CART_KEY);
    return [];
  },

  /**
   * Get cart total
   */
  getTotal() {
    const items = this.getItems();
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  /**
   * Get cart item count
   */
  getItemCount() {
    const items = this.getItems();
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }
};
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  sellerId: string;
  sellerName: string;
}

const CART_KEY = 'peeky_cart';

export const getCart = (): CartItem[] => {
  const stored = localStorage.getItem(CART_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
};

export const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1): void => {
  const cart = getCart();
  const existing = cart.find(i => i.productId === item.productId);
  
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...item, quantity });
  }
  
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const updateCartItemQuantity = (productId: string, quantity: number): void => {
  const cart = getCart();
  const item = cart.find(i => i.productId === productId);
  
  if (item) {
    item.quantity = Math.max(1, quantity);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
};

export const removeFromCart = (productId: string): void => {
  const cart = getCart();
  const filtered = cart.filter(i => i.productId !== productId);
  localStorage.setItem(CART_KEY, JSON.stringify(filtered));
};

export const clearCart = (): void => {
  localStorage.setItem(CART_KEY, JSON.stringify([]));
};

export const getCartTotal = (): number => {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const getCartCount = (): number => {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
};

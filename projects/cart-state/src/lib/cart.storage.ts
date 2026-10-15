import { CartItem } from "@shell/shared-models";

const STORAGE_KEY = 'e-commerce-cart';

// Used to read from Local Storage
export const readCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isCartItem): [];
  } catch {
    return [];
  }
}

// Used to set in the LocalStorage
export const writeCart = (items: CartItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage
  }
}

// Check if the data comply with the CartItem interface
function isCartItem(value: unknown): value is CartItem {
  const v = value as Partial<CartItem> | null;
  return (
    !!v &&
    typeof v.id === 'string' &&
    typeof v.productId === 'string' &&
    typeof v.variantId === 'string' &&
    typeof v.name === 'string' &&
    typeof v.image === 'string' &&
    Number.isFinite(v.price) &&
    Number.isInteger(v.quantity) &&
    (v.quantity as number) > 0
  )
}

export type ProductVariant = {
  id: string;
  label: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  tags: string[];
  stock: number;
  images: string[];
  variants: ProductVariant[];
  description: string;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;

  // added to decouple from mfe-catalog state
  name: string;
  price: number;
  image: string;
}

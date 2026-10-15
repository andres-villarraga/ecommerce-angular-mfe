import { Product } from '@shell/shared-models';
import { SortKey } from './catalog.models';

export function sortProducts(products: Product[], sort: SortKey): Product[] {
  const list = [...products];
  switch (sort) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price);
    case 'rating':
      return list.sort((a, b) => a.rating - b.rating || b.reviews - a.reviews);
    case 'name':
      return list.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return list;
  }
}

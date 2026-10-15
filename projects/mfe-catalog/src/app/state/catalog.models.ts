export const SORT_KEYS = ['featured', 'price-asc', 'price-desc', 'rating', 'name'] as const;
export type SortKey = (typeof SORT_KEYS)[number];

export interface CatalogFilters {
  query: string;
  category: string | null;
  maxPrice: number | null;
  sort: SortKey;
}

export type CatalogStatus = 'idle' | 'loading' | 'loaded' | 'error';

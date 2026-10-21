import { createSelector } from '@ngrx/store';
import { catalogFeature } from './catalog.feature';
import { getRouterSelectors } from '@ngrx/router-store';
import { CatalogFilters, SORT_KEYS, SortKey } from './catalog.models';
import { sortProducts } from './catalog.utils';

const { selectQueryParams, selectRouteParam } = getRouterSelectors();

export const selectFilters = createSelector(selectQueryParams, (q): CatalogFilters => {
  const sort = q['sort'] as SortKey;
  const maxPrice = Number(q['maxPrice']);

  return {
    query: (q['q'] as string) ?? '',
    category: (q['categoty'] as string) ?? null,
    maxPrice: q['maxPrice'] && Number.isFinite(maxPrice) ? maxPrice : null,
    sort: SORT_KEYS.includes(sort) ? sort : 'featured',
  };
});

export const selectFilteredProducts = createSelector(
  catalogFeature.selectProducts,
  selectFilters,
  (products, f) => {
    const q = f.query.toLowerCase();
    const list = products.filter(
      (p) =>
        (!q || p.name.toLowerCase().includes(q)) &&
        (!f.category || p.category === f.category) &&
        (f.maxPrice === null || p.price <= f.maxPrice),
    );
    return sortProducts(list, f.sort);
  },
);

export const selectCategoryCounts = createSelector(catalogFeature.selectProducts, (products) =>
  products.reduce<Record<string, number>>(
    (acc, p) => ({ ...acc, [p.category]: (acc[p.category] ?? 0) + 1 }),
    {},
  ),
);

export const selectCurrentProducts = createSelector(
  catalogFeature.selectEntities,
  selectRouteParam('slug'),
  (entities, slug) => (slug ? (entities[slug] ?? null) : null),
);

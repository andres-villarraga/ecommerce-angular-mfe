import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Product } from '@shell/shared-models';

export const CatalogApiActions = createActionGroup({
  source: 'Catalog API',
  events: {
    'Load Started': emptyProps(),
    Loaded: props<{ products: Product[] }>(),
    'Load Failed': props<{ error: string }>(),
  },
});

export const CatalogPageActions = createActionGroup({
  source: 'Catalog Page',
  events: {
    'Filter Changed': props<{ changes: Partial<Record<string, string | null>> }>(),
  },
});

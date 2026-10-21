import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { Product } from '@shell/shared-models';
import { CatalogApiActions } from './catalog.actions';
import { CatalogStatus } from './catalog.models';

export interface CatalogState extends EntityState<Product> {
  status: CatalogStatus;
  error: string | null;
}

const adapter = createEntityAdapter<Product>({ selectId: (p) => p.slug });
const initialState: CatalogState = adapter.getInitialState({
  status: 'idle' as CatalogStatus,
  error: null as string | null,
});

export const catalogFeature = createFeature({
  name: 'catalog',
  reducer: createReducer(
    initialState,

    //
    on(CatalogApiActions.loadStarted, (state): CatalogState => ({
      ...state,
      status: 'loading',
      error: null,
    })),

    //
    on(CatalogApiActions.loaded, (state, { products }) =>
      adapter.setAll(products, { ...state, status: 'loaded' as const, error: null }),
    ),

    //
    on(CatalogApiActions.loadFailed, (state, { error }) => ({ ...state, status: 'error', error })),
  ),
  extraSelectors: ({ selectCatalogState }) => ({
    selectProducts: adapter.getSelectors(selectCatalogState).selectAll,
  }),
});

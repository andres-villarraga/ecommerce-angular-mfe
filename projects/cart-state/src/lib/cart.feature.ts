import { createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { CartItem } from '@shell/shared-models';
import { CartActions } from './cart.actions';

const adapter = createEntityAdapter<CartItem>();

export const cartFeature = createFeature({
  name: 'cart',
  reducer: createReducer(
    adapter.getInitialState(),

    // Add Item Reducer
    on(CartActions.addItem, (state, { item, quantity = 1 }) => {
      const existing = state.entities[item.id];
      return existing
        ? adapter.updateOne(
            { id: item.id, changes: { quantity: existing.quantity + quantity } },
            state,
          )
        : adapter.addOne({ ...item, quantity }, state);
    }),

    // Remove Item Reducer
    on(CartActions.removeItem, (state, { id }) => adapter.removeOne(id, state)),

    // Set Quantity Item Reducer
    on(CartActions.setQuantity, (state, { id, quantity }) =>
      quantity <= 0
        ? adapter.removeOne(id, state)
        : adapter.updateOne({ id, changes: { quantity } }, state),
    ),

    // Clear Reducer
    on(CartActions.clear, (state) => adapter.removeAll(state)),

    // Hydrate Reducer
    on(CartActions.hydrate, (state, { items }) => adapter.setAll(items, state)),
  ),
  extraSelectors: ({ selectCartState }) => {
    const { selectAll } = adapter.getSelectors(selectCartState);

    return {
      selectItems: selectAll,
      selectCount: createSelector(selectAll, (items) => items.reduce((n, i) => n + i.quantity, 0)),
      selectSubtotal: createSelector(selectAll, (items) => items.reduce((s, i) => s + i.price * i.quantity, 0))
    }
  }
});

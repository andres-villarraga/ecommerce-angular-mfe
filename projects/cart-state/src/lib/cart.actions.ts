import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CartItem } from '@shell/shared-models';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Add Item': props<{ item: Omit<CartItem, 'quantity'>; quantity: number }>(),
    'Remove Item': props<{ id: string }>(),
    'Set Quantity': props<{ id: string; quantity: number }>(),
    clear: emptyProps(),
    Hydrate: props<{ items: CartItem[] }>(),
  },
});

import { createFeature, createReducer, on } from '@ngrx/store';
import { OrderSummary } from './checkout.models';
import { CheckoutApiAction, CheckoutPageActions } from './checkout.actions';

export type CheckoutStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface CheckoutState {
  status: CheckoutStatus;
  order: OrderSummary | null;
  error: string | null;
}

const initialState: CheckoutState = {
  status: 'idle',
  order: null,
  error: null,
};

export const checkoutFeature = createFeature({
  name: 'checkout',
  reducer: createReducer(
    initialState,

    //
    on(CheckoutPageActions.placeOrder, (): CheckoutState => ({ status: 'submitting', order: null, error: null })),
    on(CheckoutPageActions.reset, (): CheckoutState => initialState),

    //
    on(CheckoutApiAction.orderPlaced, (_, { order }): CheckoutState => ({ status: 'success', order, error: null })),
    on(CheckoutApiAction.orderFailed, (state, { error }): CheckoutState => ({ ...state, status: 'error', error })),
  )
});

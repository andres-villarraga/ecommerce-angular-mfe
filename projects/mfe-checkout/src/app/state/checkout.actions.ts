import { createActionGroup, emptyProps, props } from "@ngrx/store";

import { CustomerInfo, OrderSummary } from "./checkout.models";

export const CheckoutPageActions = createActionGroup({
  source: 'Checkout Page',
  events: {
    'Place Order': props<{customer: CustomerInfo}>(),
    'Reset': emptyProps()
  }
});

export const CheckoutApiAction = createActionGroup({
  source: 'Checkout API',
  events: {
    'Order Placed': props<{ order: OrderSummary }>(),
    'Order Failed': props<{ error: string }>(),
  }
});

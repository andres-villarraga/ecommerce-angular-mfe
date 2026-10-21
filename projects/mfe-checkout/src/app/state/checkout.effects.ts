import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CheckoutApiAction, CheckoutPageActions } from "./checkout.actions";

import { tap, catchError, map, of, exhaustMap, timer} from "rxjs";

import { CartFacade } from "@shell/cart-state";

@Injectable()
export class CheckoutEffects {
  private actions$ = inject(Actions);
  private cart = inject(CartFacade);

  placeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutPageActions.placeOrder),
      exhaustMap(({ customer }) => {
        const total = this.cart.subtotal();
        const itemCount = this.cart.count();

        return timer(1200).pipe(
          map(()=> {
            if(Math.random() < .15) throw new Error('Payment Declined, Please try again.');
            return CheckoutApiAction.orderPlaced({
              order: {
                orderId: crypto.randomUUID().slice(0, 8).toUpperCase(),
                total,
                itemCount,
                customerName: customer.fullName,
              }
            })
          }),
          catchError((e: Error) => of(CheckoutApiAction.orderFailed({ error: e.message }))),
        )
      })
    )
  );

  clearCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutApiAction.orderPlaced),
      tap(() => this.cart.clear())
    ), { dispatch: false }
  )

}

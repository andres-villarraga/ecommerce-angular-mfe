import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { CartActions } from './cart.actions';

import { debounceTime, tap, withLatestFrom } from 'rxjs';
import { cartFeature } from './cart.feature';
import { readCart, writeCart } from './cart.storage';

@Injectable()
export class CartEffects implements OnInitEffects {
  private action$ = inject(Actions);
  private store = inject(Store);

  ngrxOnInitEffects(): Action {
    return CartActions.hydrate({ items: readCart() });
  }

  persist$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          CartActions.addItem,
          CartActions.removeItem,
          CartActions.setQuantity,
          CartActions.clear,
        ),
        debounceTime(3000),
        withLatestFrom(this.store.select(cartFeature.selectItems)),
        tap(([, items]) => writeCart(items)),
      ),
    { dispatch: false },
  );
}

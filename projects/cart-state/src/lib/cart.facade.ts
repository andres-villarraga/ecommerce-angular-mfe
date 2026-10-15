import { computed, inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { cartFeature } from "./cart.feature";
import { CartItem } from "@shell/shared-models";
import { CartActions } from "./cart.actions";

// This facade will provide the methods for external use, hiding all the logic required

@Injectable({ providedIn: 'root' })
export class CartFacade {
  private store = inject(Store);

  readonly items = this.store.selectSignal(cartFeature.selectItems);
  readonly count = this.store.selectSignal(cartFeature.selectCount);
  readonly subtotal = this.store.selectSignal(cartFeature.selectSubtotal);
  readonly isEmpty = computed(() => this.count() === 0);

  add(item: Omit<CartItem, 'quantity'>, quantity = 1) {
    this.store.dispatch(CartActions.addItem({item, quantity}));
  }

  remove(id: string) {
    this.store.dispatch(CartActions.removeItem({id}));
  }

  setQuantity(id: string, quantity: number){
    this.store.dispatch(CartActions.setQuantity({ id, quantity }));
  }

  clear(){
    this.store.dispatch(CartActions.clear());
  }
}

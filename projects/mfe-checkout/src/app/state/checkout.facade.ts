import { computed, inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { checkoutFeature } from "./checkout.features";
import { CheckoutPageActions } from "./checkout.actions";
import { CustomerInfo } from "./checkout.models";

@Injectable({ providedIn: 'root' })
export class CheckoutFacade {
  private store = inject(Store);
  readonly status = this.store.selectSignal(checkoutFeature.selectStatus);
  readonly order = this.store.selectSignal(checkoutFeature.selectOrder);
  readonly error = this.store.selectSignal(checkoutFeature.selectError);
  readonly isSubmitting = computed(() => this.status() === 'submitting');
  readonly isSuccess = computed(() => this.status() === 'success');

  placeOrder(customer: CustomerInfo): void {
    this.store.dispatch(CheckoutPageActions.placeOrder({ customer }));
  }

  reset(): void {
    this.store.dispatch(CheckoutPageActions.reset());
  }
}

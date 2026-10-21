import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { CartFacade } from "@shell/cart-state";
import { CheckoutFacade } from "../state/checkout.facade";

export const cartNotEmptyGuard: CanActivateFn = () =>
  inject(CartFacade).isEmpty() ? inject(Router).createUrlTree(['/shop']) : true

export const orderPlacedGuard: CanActivateFn = () =>
  inject(CheckoutFacade).isSuccess() ? true : inject(Router).createUrlTree(['/checkout']);

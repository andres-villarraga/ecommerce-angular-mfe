import { Routes } from '@angular/router';
import { cartNotEmptyGuard, orderPlacedGuard } from './guards/checkout.guards';

import { CheckoutPageComponent } from './features/checkout-page/checkout-page.component';
import { ConfirmationPageComponent } from './features/confirmation-page/confirmation-page.component';

export const routes: Routes = [
  {
    path: '',
    providers: [],
    children: [
      {
        path: '',
        component: CheckoutPageComponent,
        canActivate: [cartNotEmptyGuard],
        title: 'Checkout'
      },
      {
        path: 'confirmation',
        component: ConfirmationPageComponent,
        canActivate: [orderPlacedGuard],
        title: 'Order Confirmed'
      },
    ]
  }
];

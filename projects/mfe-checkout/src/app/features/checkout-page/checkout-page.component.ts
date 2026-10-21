import { ChangeDetectionStrategy, Component, effect, inject} from '@angular/core';
import { CheckoutFacade } from '../../state/checkout.facade';
import { CartFacade } from '@shell/cart-state';
import { ActivatedRoute, Router } from '@angular/router';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  imports: [],
  selector: 'app-checkout-page',
  styleUrl: './checkout-page.component.scss',
  templateUrl: './checkout-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutPageComponent {
  protected facade = inject(CheckoutFacade);
  protected cart = inject(CartFacade);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected form = inject(NonNullableFormBuilder).group({
    fullName: ['', Validators.required, Validators.minLength(3)],
    email: ['', Validators.required, Validators.email],
    phone: ['', Validators.required, Validators.pattern(/^\+?[0-9 ]{7,15}$/)],
    address: ['', Validators.required],
    city: ['', Validators.required],
  })

  constructor() {
    this.facade.reset();

    effect(() => {
      if(this.facade.isSuccess()){
        this.router.navigate(['confirmation'], { relativeTo: this.route });
      }
    });
  }

  protected invalid(name: string) {
    const field = this.form.get(name);
    return !!field && field.invalid && field.touched;
  }

  protected submit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.facade.placeOrder(this.form.getRawValue());
  }

}

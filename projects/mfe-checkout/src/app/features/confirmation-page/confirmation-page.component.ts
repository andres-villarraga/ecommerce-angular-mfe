import { Component, inject } from '@angular/core';
import { CheckoutFacade } from '../../state/checkout.facade';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [JsonPipe],
  selector: 'app-confirmation-page',
  styleUrl: './confirmation-page.component.scss',
  templateUrl: './confirmation-page.component.html',
})
export class ConfirmationPageComponent {
  private facade = inject(CheckoutFacade);

  protected readonly info = this.facade.order();
}

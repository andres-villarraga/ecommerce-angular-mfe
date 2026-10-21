import { NgOptimizedImage } from '@angular/common';
import { booleanAttribute, Component, input } from '@angular/core';
import { Product } from '@shell/shared-models';
import { ButtonComponent } from '@shell/shared-ui';

@Component({
  imports: [ButtonComponent, NgOptimizedImage],
  selector: 'ecom-product',
  styleUrl: './product.component.scss',
  templateUrl: './product.component.html',
  standalone: true
})
export class ProductComponent {
  readonly product = input.required<Product>();
  readonly priority = input(false, { transform: booleanAttribute });
}

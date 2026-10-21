import { Component, inject } from '@angular/core';
import { BannerComponent } from "@shell/shared-ui";
import { ProductComponent } from '../../components/product/product.component';
import { CatalogFacade } from '../../state/catalog.facade';

@Component({
  imports: [BannerComponent, ProductComponent],
  providers: [CatalogFacade],
  selector: 'app-catalog-page.component',
  styleUrl: './catalog-page.component.scss',
  templateUrl: './catalog-page.component.html',
  standalone: true
})
export class CatalogPageComponent {
  private facade = inject(CatalogFacade);

  protected productList = this.facade.products;
  protected isLoading = this.facade.isLoading;
}

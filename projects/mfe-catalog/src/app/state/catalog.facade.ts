import { computed, inject, Injectable } from '@angular/core';
import { catalogFeature } from './catalog.feature';
import {
  selectCategoryCounts,
  selectCurrentProducts,
  selectFilteredProducts,
  selectFilters,
} from './catalog.selectors';
import { Store } from '@ngrx/store';
import { CatalogPageActions } from './catalog.actions';

@Injectable()
export class CatalogFacade {
  private store = inject(Store);

  readonly products = this.store.selectSignal(selectFilteredProducts);
  readonly filters = this.store.selectSignal(selectFilters);
  readonly categoryCounts = this.store.selectSignal(selectCategoryCounts);
  readonly status = this.store.selectSignal(catalogFeature.selectStatus);
  readonly current = this.store.selectSignal(selectCurrentProducts);
  readonly isLoading = computed(() => this.status() === 'loading');
  readonly hasError = computed(() => this.status() === 'error');

  setFilters(changes: Partial<Record<string, string | null>>) {
    this.store.dispatch(CatalogPageActions.filterChanged({ changes }));
  }
}

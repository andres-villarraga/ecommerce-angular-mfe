import { httpResource } from '@angular/common/http';
import { effect, inject, Injectable, untracked } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '@shell/shared-models';
import { CatalogApiActions } from './catalog.actions';

@Injectable()
export class CatalogLoader {
  private store = inject(Store);
  private resource = httpResource<Product[]>(() => '/data/products.json');

  constructor() {
    effect(() => {
      const status = this.resource.status();
      untracked(() => {
        if (status === 'loading') this.store.dispatch(CatalogApiActions.loadStarted());
        if (status === 'resolved')
          this.store.dispatch(CatalogApiActions.loaded({ products: this.resource.value()! }));
        if (status === 'error')
          this.store.dispatch(
            CatalogApiActions.loadFailed({ error: String(this.resource.error()) }),
          );
      });
    });
  }
}

import { Routes } from '@angular/router';
import { inject, provideEnvironmentInitializer } from '@angular/core';

import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { catalogFeature } from './state/catalog.feature';
import { CatalogEffects } from './state/catalog.effects';
import { CatalogLoader } from './state/catalog.loader';
import { CatalogPageComponent } from './features/catalog-page/catalog-page.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';

export const CATALOG_ROUTES: Routes = [
  {
    path: '',
    providers: [
      provideState(catalogFeature),
      provideEffects(CatalogEffects),
      CatalogLoader,
      provideEnvironmentInitializer(() => inject(CatalogLoader)),
    ],
    children: [
      { path: '', component: CatalogPageComponent },
      { path: ':slug', component: ProductDetailComponent },
    ],
  },
];

import { Routes } from '@angular/router';
import { buildRemoteRoute } from './shared/utils/remote-loader.utils';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'shop',
        pathMatch: 'full'
      },
      buildRemoteRoute('shop', 'mfe-catalog', './routes'),
      buildRemoteRoute('cart', 'mfe-cart', './routes'),
      buildRemoteRoute('checkout', 'mfe-checkout', './routes'),
    ]
  },
  { path: '**', component: NotFoundComponent },
];

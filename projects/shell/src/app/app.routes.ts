import { Routes } from '@angular/router';
import { buildRemoteRoute } from './shared/utils/remote-loader.utils';
import { HomeComponent } from './features/home/home.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  buildRemoteRoute('shop', 'mfe-catalog', './routes'),
  buildRemoteRoute('cart', 'mfe-cart', './routes'),
  buildRemoteRoute('checkout', 'mfe-checkout', './routes'),
  { path: '**', component: NotFoundComponent },
];

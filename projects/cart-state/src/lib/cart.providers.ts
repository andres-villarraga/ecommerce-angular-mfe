import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideState } from '@ngrx/store';
import { cartFeature } from './cart.feature';
import { provideEffects } from '@ngrx/effects';
import { CartEffects } from './cart.effects';

export const provideCartState = (): EnvironmentProviders => {
  return makeEnvironmentProviders([provideState(cartFeature), provideEffects(CartEffects)]);
};

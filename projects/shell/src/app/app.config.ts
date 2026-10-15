import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

// NgRx
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { provideRouterStore, routerReducer } from "@ngrx/router-store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideHttpClient } from '@angular/common/http';

// Cart State Provider
import { provideCartState } from '@shell/cart-state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),

    // NgRx registration
    provideHttpClient(),
    provideStore({ router: routerReducer }),
    provideEffects(),
    provideRouterStore(),
    provideCartState(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode })
  ],
};

import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogPageActions } from './catalog.actions';
import { tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class CatalogEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);

  navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CatalogPageActions.filterChanged),
        tap(({ changes }) =>
          this.router.navigate([], { queryParams: changes, queryParamsHandling: 'merge' }),
        ),
      ),
    { dispatch: false },
  );
}

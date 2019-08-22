import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import {
  CollectionApiActions,
  CollectionPageActions,
  SelectedProductPageActions,
} from '@example-app/products/actions';
import { Product } from '@example-app/products/models';
import { ProductStorageService } from '@example-app/core/services';

@Injectable()
export class CollectionEffects {
  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the supported call in `defer` makes
   * effect easier to test.
   */
  checkStorageSupport$ = createEffect(
    () => defer(() => this.storageService.supported()),
    { dispatch: false }
  );

  loadCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionPageActions.loadCollection),
      switchMap(() =>
        this.storageService.getCollection().pipe(
          map((products: Product[]) =>
            CollectionApiActions.loadProductsSuccess({ products })
          ),
          catchError(error =>
            of(CollectionApiActions.loadProductsFailure({ error }))
          )
        )
      )
    )
  );

  addProductToCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SelectedProductPageActions.addProduct),
      mergeMap(({ product }) =>
        this.storageService.addToCollection([product]).pipe(
          map(() => CollectionApiActions.addProductSuccess({ product })),
          catchError(() =>
            of(CollectionApiActions.addProductFailure({ product }))
          )
        )
      )
    )
  );

  removeProductFromCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SelectedProductPageActions.removeProduct),
      mergeMap(({ product }) =>
        this.storageService.removeFromCollection([product.id]).pipe(
          map(() => CollectionApiActions.removeProductSuccess({ product })),
          catchError(() =>
            of(CollectionApiActions.removeProductFailure({ product }))
          )
        )
      )
    )
  );

  clearCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionApiActions.clearCollection),
      switchMap(() =>
        this.storageService.deleteCollection().pipe(
          map(() => CollectionApiActions.clearCollectionSuccess()),
          catchError(() =>
            of(
              CollectionApiActions.clearCollectionFailure({
                error: 'error on clear collection',
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private storageService: ProductStorageService
  ) {}
}

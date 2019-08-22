import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, EMPTY as empty, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  skip,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import { Product, ProductDetail } from '@example-app/products/models';
import {
  ProductApiActions,
  FindProductPageActions,
  ProductDetailActions,
} from '@example-app/products/actions';
import { ProductService } from '@example-app/core/services/product-service';

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class ProductEffects {
  search$ = createEffect(
    () => ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
      this.actions$.pipe(
        ofType(FindProductPageActions.searchProduct),
        debounceTime(debounce, scheduler),
        switchMap(({ query }) => {
          const nextSearch$ = this.actions$.pipe(
            ofType(FindProductPageActions.searchProduct),
            skip(1)
          );

          return this.productService.search(query).pipe(
            takeUntil(nextSearch$),
            map((products: Product[]) =>
              ProductApiActions.searchSuccess({ products })
            ),
            catchError(err =>
              of(ProductApiActions.searchFailure({ errorMsg: err }))
            )
          );
        })
      )
  );

  loadProductDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductDetailActions.loadProductDetail),
      switchMap(({ productDetailRequest }) =>
        this.productService.getProductDetail(productDetailRequest).pipe(
          map((productDetail: ProductDetail) =>
            ProductDetailActions.loadProductDetailSuccess({ productDetail })
          ),
          catchError(error =>
            of(ProductDetailActions.loadProductDetailError({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}

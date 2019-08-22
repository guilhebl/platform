import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import * as fromProducts from '@example-app/products/reducers';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductExistsGuard implements CanActivate {
  constructor(private store: Store<fromProducts.State>) {}

  /**
   * This method creates an observable that waits for the `loaded` property
   * of the collection state to turn `true`, emitting one time once loading
   * has finished.
   */
  waitForCollectionToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(fromProducts.getCollectionLoaded),
      filter(loaded => loaded),
      take(1)
    );
  }

  /**
   * This method checks if a product with the given ID is already registered
   * in the Store
   */
  hasProductInStore(id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromProducts.getProductEntities),
      map(entities => !!entities[id]),
      take(1)
    );
  }

  /**
   * `hasProduct` composes `hasProductInStore` and `hasProductInApi`. It first checks
   * if the product is in store, and if not it then checks if it is in the
   * API.
   */
  hasProduct(id: string): Observable<boolean> {
    return this.hasProductInStore(id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return of(false);
      })
    );
  }

  /**
   * This is the actual method the router will call when our guard is run.
   *
   * Our guard waits for the collection to load, then it checks if we need
   * to request a product from the API or if we already have it in our cache.
   * If it finds it in the cache or in the API, it returns an Observable
   * of `true` and the route is rendered successfully.
   *
   * If it was unable to find it in our cache or in the API, this guard
   * will return an Observable of `false`, causing the router to move
   * on to the next candidate route. In this case, it will move on
   * to the 404 page.
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.waitForCollectionToLoad().pipe(
      switchMap(() => this.hasProduct(route.params['id']))
    );
  }
}

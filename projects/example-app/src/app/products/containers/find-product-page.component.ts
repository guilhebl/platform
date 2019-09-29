import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { FindProductPageActions } from '@example-app/products/actions';
import { Product } from '@example-app/products/models';
import * as fromProducts from '@example-app/products/reducers';

@Component({
  selector: 'bc-find-product-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'find-product-page.component.html',
})
export class FindProductPageComponent {
  searchQuery$: Observable<string>;
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<fromProducts.State>) {
    this.searchQuery$ = store.pipe(
      select(fromProducts.getSearchQuery),
      take(1)
    );

    this.products$ = store.pipe(select(fromProducts.getSearchResults));
    this.loading$ = store.pipe(select(fromProducts.getSearchLoading));
    this.error$ = store.pipe(select(fromProducts.getSearchError));
  }

  search(query: string) {
    this.store.dispatch(FindProductPageActions.searchProduct({ query }));
  }
}

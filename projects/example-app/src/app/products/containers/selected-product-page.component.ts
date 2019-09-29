import { ChangeDetectionStrategy, Component } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SelectedProductPageActions } from '@example-app/products/actions';
import { ProductDetail, Product } from '@example-app/products/models';
import * as fromProducts from '@example-app/products/reducers';

@Component({
  selector: 'bc-selected-product-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'selected-product-page.component.html'
})
export class SelectedProductPageComponent {
  productDetail$: Observable<ProductDetail>;
  loading$: Observable<boolean>;
  isSelectedProductInCollection$: Observable<boolean>;

  constructor(private store: Store<fromProducts.State>) {
    this.productDetail$ = store.pipe(
      select(fromProducts.getProductDetail)
    ) as Observable<ProductDetail>;
    this.isSelectedProductInCollection$ = store.pipe(
      select(fromProducts.isSelectedProductInCollection)
    );

    this.loading$ = store.pipe(select(fromProducts.getProductDetailLoading));
  }

  addToCollection(product: Product) {
    this.store.dispatch(SelectedProductPageActions.addProduct({ product }));
  }

  removeFromCollection(product: Product) {
    this.store.dispatch(SelectedProductPageActions.removeProduct({ product }));
  }
}

import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromProducts from '@example-app/products/reducers';
import { ProductDetailActions } from '@example-app/products/actions';

/**
 * Note: Container components are also reusable. Whether or not
 * a component is a presentation component or a container
 * component is an implementation detail.
 *
 * The View Product Page's responsibility is to map router params
 * to a 'Select' product action. Actually showing the selected
 * product remains a responsibility of the
 * SelectedProductPageComponent
 */
@Component({
  selector: 'bc-view-product-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-selected-product-page></bc-selected-product-page>
  `,
})
export class ViewProductPageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<fromProducts.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.queryParams
      .pipe(
        map(params =>
          ProductDetailActions.loadProductDetail({
            productDetailRequest: {
              id: route.snapshot.params.id,
              idType: params.idType,
              source: params.source,
            },
          })
        )
      )
      .subscribe(action => store.dispatch(action));
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}

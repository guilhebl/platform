import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  CollectionPageActions,
  CollectionApiActions,
} from '@example-app/products/actions';
import { Product } from '@example-app/products/models';
import * as fromProducts from '@example-app/products/reducers';

@Component({
  selector: 'bc-collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'collection-page.component.html',
  styleUrls: ['collection-page.component.css'],
})
export class CollectionPageComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private store: Store<fromProducts.State>) {
    this.products$ = store.pipe(select(fromProducts.getProductCollection));
  }

  ngOnInit() {
    this.store.dispatch(CollectionPageActions.loadCollection());
  }

  clear() {
    this.store.dispatch(CollectionApiActions.clearCollection());
  }
}

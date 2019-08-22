import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import {
  MatCardModule,
  MatInputModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { FindProductPageActions } from '@example-app/products/actions';
import {
  ProductSourceComponent,
  ProductPreviewComponent,
  ProductPreviewListComponent,
  ProductSearchComponent,
} from '@example-app/products/components';
import { FindProductPageComponent } from '@example-app/products/containers';
import * as fromProducts from '@example-app/products/reducers';
import { AddCommasPipe } from '@example-app/shared/pipes/add-commas.pipe';
import { EllipsisPipe } from '@example-app/shared/pipes/ellipsis.pipe';

describe('Find Product Page', () => {
  let fixture: ComponentFixture<FindProductPageComponent>;
  let store: MockStore<fromProducts.State>;
  let instance: FindProductPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        MatInputModule,
        MatCardModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
      ],
      declarations: [
        FindProductPageComponent,
        ProductSearchComponent,
        ProductPreviewComponent,
        ProductPreviewListComponent,
        ProductSourceComponent,
        AddCommasPipe,
        EllipsisPipe,
      ],
      providers: [
        provideMockStore({
          selectors: [
            { selector: fromProducts.getSearchQuery, value: '' },
            { selector: fromProducts.getSearchResults, value: [] },
            { selector: fromProducts.getSearchLoading, value: false },
            { selector: fromProducts.getSearchError, value: '' },
          ],
        }),
      ],
    });

    fixture = TestBed.createComponent(FindProductPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch');
  });

  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a product.Search action on search', () => {
    const $event = 'product name';
    const action = FindProductPageActions.searchProduct({ query: $event });

    instance.search($event);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});

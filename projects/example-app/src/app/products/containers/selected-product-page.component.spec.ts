import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { SelectedProductPageActions } from '@example-app/products/actions';
import {
  ProductSourceComponent,
  ProductDetailComponent,
} from '@example-app/products/components';
import { SelectedProductPageComponent } from '@example-app/products/containers';
import { Product, generateMockProduct } from '@example-app/products/models';
import * as fromProducts from '@example-app/products/reducers';
import { AddCommasPipe } from '@example-app/shared/pipes/add-commas.pipe';

describe('Selected Product Page', () => {
  let fixture: ComponentFixture<SelectedProductPageComponent>;
  let store: MockStore<fromProducts.State>;
  let instance: SelectedProductPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatCardModule],
      declarations: [
        SelectedProductPageComponent,
        ProductDetailComponent,
        ProductSourceComponent,
        AddCommasPipe,
      ],
      providers: [provideMockStore()],
    });

    fixture = TestBed.createComponent(SelectedProductPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch');
  });

  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a collection.AddProduct action when addToCollection is called', () => {
    const $event: Product = generateMockProduct();
    const action = SelectedProductPageActions.addProduct({ product: $event });

    instance.addToCollection($event);

    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });

  it('should dispatch a collection.RemoveProduct action on removeFromCollection', () => {
    const $event: Product = generateMockProduct();
    const action = SelectedProductPageActions.removeProduct({
      product: $event,
    });

    instance.removeFromCollection($event);

    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });
});

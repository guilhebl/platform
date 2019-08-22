import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BehaviorSubject } from 'rxjs';
import { MatCardModule } from '@angular/material';

import {
  ProductSourceComponent,
  ProductDetailComponent,
} from '@example-app/products/components';
import { SelectedProductPageComponent } from '@example-app/products/containers';
import { ViewProductPageComponent } from '@example-app/products/containers';
import { ViewProductPageActions } from '@example-app/products/actions';
import * as fromProducts from '@example-app/products/reducers';
import { AddCommasPipe } from '@example-app/shared/pipes/add-commas.pipe';

describe('View Product Page', () => {
  let fixture: ComponentFixture<ViewProductPageComponent>;
  let store: MockStore<fromProducts.State>;
  let instance: ViewProductPageComponent;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: new BehaviorSubject({}) },
        },
        provideMockStore(),
      ],
      declarations: [
        ViewProductPageComponent,
        SelectedProductPageComponent,
        ProductDetailComponent,
        ProductSourceComponent,
        AddCommasPipe,
      ],
    });

    fixture = TestBed.createComponent(ViewProductPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.get(Store);
    route = TestBed.get(ActivatedRoute);

    jest.spyOn(store, 'dispatch');
  });

  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a product.Select action on init', () => {
    const action = ViewProductPageActions.selectProduct({ id: '2' });

    (route.params as BehaviorSubject<any>).next({ id: '2' });

    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });
});

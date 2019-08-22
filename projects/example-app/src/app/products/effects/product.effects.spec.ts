import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import {
  ProductApiActions,
  FindProductPageActions,
} from '@example-app/products/actions';
import { ProductEffects } from '@example-app/products/effects';
import { Product } from '@example-app/products/models';
import { ProductService } from '@example-app/core/services/product-service';

describe('ProductEffects', () => {
  let effects: ProductEffects;
  let googleProductsService: any;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        {
          provide: ProductService,
          useValue: { searchProducts: jest.fn() },
        },
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.get(ProductEffects);
    googleProductsService = TestBed.get(ProductService);
    actions$ = TestBed.get(Actions);
  });

  describe('search$', () => {
    it('should return a product.SearchComplete, with the products, on success, after the de-bounce', () => {
      const product1 = {
        id: '1',
        upc: 'upc1',
        name: 'name1',
        sourceName: 'AMAZON',
        sourceItemDetailViewUrl: 'http://localhost/detail/1.jpg',
        imageUrl: 'http://localhost/detail/image/1.jpg',
        sourceImageUrl: 'http://localhost/source/amazon.jpg',
        category: 'test',
        price: 14.55,
        rating: 4.5,
        numReviews: 100,
      } as Product;

      const product2 = {
        id: '2',
        upc: 'upc2',
        name: 'name2',
        sourceName: 'WALMART',
        sourceItemDetailViewUrl: 'http://localhost/detail/2.jpg',
        imageUrl: 'http://localhost/detail/image/2.jpg',
        sourceImageUrl: 'http://localhost/source/walmart.jpg',
        category: 'test',
        price: 1.55,
        rating: 3.5,
        numReviews: 256,
      } as Product;

      const products = [product1, product2];

      const action = FindProductPageActions.searchProduct({ query: 'query' });
      const completion = ProductApiActions.searchSuccess({ products });

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: products });
      const expected = cold('-----b', { b: completion });
      googleProductsService.searchProducts = jest.fn(() => response);

      expect(
        effects.search$({
          debounce: 30,
          scheduler: getTestScheduler(),
        })
      ).toBeObservable(expected);
    });

    it('should return a product.SearchError if the products service throws', () => {
      const action = FindProductPageActions.searchProduct({ query: 'query' });
      const completion = ProductApiActions.searchFailure({
        errorMsg: 'Unexpected Error. Try again later.',
      });
      const error = 'Unexpected Error. Try again later.';

      actions$ = hot('-a---', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('-----b', { b: completion });
      googleProductsService.searchProducts = jest.fn(() => response);

      expect(
        effects.search$({
          debounce: 30,
          scheduler: getTestScheduler(),
        })
      ).toBeObservable(expected);
    });

    it(`should not do anything if the query is an empty string`, () => {
      const action = FindProductPageActions.searchProduct({ query: '' });

      actions$ = hot('-a---', { a: action });
      const expected = cold('---');

      expect(
        effects.search$({
          debounce: 30,
          scheduler: getTestScheduler(),
        })
      ).toBeObservable(expected);
    });
  });
});

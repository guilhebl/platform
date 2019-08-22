import { TestBed } from '@angular/core/testing';

import {
  CollectionApiActions,
  CollectionPageActions,
  SelectedProductPageActions,
} from '@example-app/products/actions';
import { CollectionEffects } from '@example-app/products/effects';
import { Product } from '@example-app/products/models';
import {
  ProductStorageService,
  LOCAL_STORAGE_TOKEN,
} from '@example-app/core/services';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

describe('CollectionEffects', () => {
  let db: any;
  let effects: CollectionEffects;
  let actions$: Observable<any>;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CollectionEffects,
        {
          provide: ProductStorageService,
          useValue: {
            supported: jest.fn(),
            deleteStoredCollection: jest.fn(),
            addToCollection: jest.fn(),
            getCollection: jest.fn(),
            removeFromCollection: jest.fn(),
          },
        },
        {
          provide: LOCAL_STORAGE_TOKEN,
          useValue: {
            removeItem: jest.fn(),
            setItem: jest.fn(),
            getItem: jest.fn(_ => JSON.stringify([])),
          },
        },
        provideMockActions(() => actions$),
      ],
    });

    db = TestBed.get(ProductStorageService);
    effects = TestBed.get(CollectionEffects);
    actions$ = TestBed.get(Actions);
  });
  describe('checkStorageSupport$', () => {
    it('should call db.checkStorageSupport when initially subscribed to', () => {
      effects.checkStorageSupport$.subscribe();
      expect(db.supported).toHaveBeenCalled();
    });
  });
  describe('loadCollection$', () => {
    it('should return a collection.LoadSuccess, with the products, on success', () => {
      const action = CollectionPageActions.loadCollection();
      const completion = CollectionApiActions.loadProductsSuccess({
        products: [product1, product2],
      });

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: [product1, product2] });
      const expected = cold('--c', { c: completion });
      db.getCollection = jest.fn(() => response);

      expect(effects.loadCollection$).toBeObservable(expected);
    });

    it('should return a collection.LoadFail, if the query throws', () => {
      const action = CollectionPageActions.loadCollection();
      const error = 'Error!';
      const completion = CollectionApiActions.loadProductsFailure({ error });

      actions$ = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--c', { c: completion });
      db.getCollection = jest.fn(() => response);

      expect(effects.loadCollection$).toBeObservable(expected);
    });
  });

  describe('addProductToCollection$', () => {
    it('should return a collection.AddProductSuccess, with the product, on success', () => {
      const action = SelectedProductPageActions.addProduct({
        product: product1,
      });
      const completion = CollectionApiActions.addProductSuccess({
        product: product1,
      });

      actions$ = hot('-a', { a: action });
      const response = cold('-b', { b: true });
      const expected = cold('--c', { c: completion });
      db.addToCollection = jest.fn(() => response);

      expect(effects.addProductToCollection$).toBeObservable(expected);
      expect(db.addToCollection).toHaveBeenCalledWith([product1]);
    });

    it('should return a collection.AddProductFail, with the product, when the db insert throws', () => {
      const action = SelectedProductPageActions.addProduct({
        product: product1,
      });
      const completion = CollectionApiActions.addProductFailure({
        product: product1,
      });
      const error = 'Error!';

      actions$ = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--c', { c: completion });
      db.addToCollection = jest.fn(() => response);

      expect(effects.addProductToCollection$).toBeObservable(expected);
    });

    describe('removeProductFromCollection$', () => {
      it('should return a collection.RemoveProductSuccess, with the product, on success', () => {
        const action = SelectedProductPageActions.removeProduct({
          product: product1,
        });
        const completion = CollectionApiActions.removeProductSuccess({
          product: product1,
        });

        actions$ = hot('-a', { a: action });
        const response = cold('-b', { b: true });
        const expected = cold('--c', { c: completion });
        db.removeFromCollection = jest.fn(() => response);

        expect(effects.removeProductFromCollection$).toBeObservable(expected);
        expect(db.removeFromCollection).toHaveBeenCalledWith([product1.id]);
      });

      it('should return a collection.RemoveProductFail, with the product, when the db insert throws', () => {
        const action = SelectedProductPageActions.removeProduct({
          product: product1,
        });
        const completion = CollectionApiActions.removeProductFailure({
          product: product1,
        });
        const error = 'Error!';

        actions$ = hot('-a', { a: action });
        const response = cold('-#', {}, error);
        const expected = cold('--c', { c: completion });
        db.removeFromCollection = jest.fn(() => response);

        expect(effects.removeProductFromCollection$).toBeObservable(expected);
        expect(db.removeFromCollection).toHaveBeenCalledWith([product1.id]);
      });
    });
  });
});

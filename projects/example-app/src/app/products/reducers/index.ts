import { Product } from '@example-app/products/models';
import * as fromCollection from '@example-app/products/reducers/collection.reducer';
import * as fromProducts from '@example-app/products/reducers/products.reducer';
import * as fromSearch from '@example-app/products/reducers/search.reducer';
import * as fromProductDetail from '@example-app/products/reducers/product-detail.reducer';
import * as fromRoot from '@example-app/reducers';
import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

export interface ProductsState {
  search: fromSearch.State;
  products: fromProducts.State;
  productDetail: fromProductDetail.State;
  collection: fromCollection.State;
}

export interface State extends fromRoot.State {
  products: ProductsState;
}

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: ProductsState | undefined, action: Action) {
  return combineReducers({
    search: fromSearch.reducer,
    products: fromProducts.reducer,
    productDetail: fromProductDetail.reducer,
    collection: fromCollection.reducer,
  })(state, action);
}

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `products` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 *   constructor(state$: Observable<State>) {
 *     this.productsState$ = state$.pipe(select(getProductsState));
 *   }
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getProductsState = createFeatureSelector<State, ProductsState>(
  'products'
);

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getProductEntitiesState = createSelector(
  getProductsState,
  state => state.products
);

export const getSelectedProductId = createSelector(
  getProductEntitiesState,
  fromProducts.getSelectedId
);

export const getProductDetailState = createSelector(
  getProductsState,
  state => state.productDetail
);

export const getProductDetail = createSelector(
  getProductDetailState,
  fromProductDetail.getProductDetail
);

export const getProductDetailLoading = createSelector(
  getProductDetailState,
  fromProductDetail.getProductDetailLoading
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: getProductIds,
  selectEntities: getProductEntities,
  selectAll: getAllProducts,
  selectTotal: getTotalProducts,
} = fromProducts.adapter.getSelectors(getProductEntitiesState);

export const getSelectedProduct = createSelector(
  getProductEntities,
  getProductDetail,
  //getSelectedProductId,
  (entities, productDetail) => {
    return productDetail && entities[productDetail.product.id];
  }
);

/**
 * Just like with the products selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */
export const getSearchState = createSelector(
  getProductsState,
  (state: ProductsState) => state.search
);

export const getSearchProductIds = createSelector(
  getSearchState,
  fromSearch.getIds
);
export const getSearchQuery = createSelector(
  getSearchState,
  fromSearch.getQuery
);
export const getSearchLoading = createSelector(
  getSearchState,
  fromSearch.getLoading
);
export const getSearchError = createSelector(
  getSearchState,
  fromSearch.getError
);

/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of products in the store.
 */
export const getSearchResults = createSelector(
  getProductEntities,
  getSearchProductIds,
  (products, searchIds) => {
    return searchIds
      .map(id => products[id])
      .filter((product): product is Product => product != null);
  }
);

export const getCollectionState = createSelector(
  getProductsState,
  (state: ProductsState) => state.collection
);

export const getCollectionLoaded = createSelector(
  getCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  getCollectionState,
  fromCollection.getLoading
);
export const getCollectionProductIds = createSelector(
  getCollectionState,
  fromCollection.getIds
);

export const getProductCollection = createSelector(
  getProductEntities,
  getCollectionProductIds,
  (entities, ids) => {
    return ids
      .map(id => entities[id])
      .filter((product): product is Product => product != null);
  }
);

export const isSelectedProductInCollection = createSelector(
  getCollectionProductIds,
  getProductDetail,
  (ids, productDetail) => {
    return productDetail ? ids.indexOf(productDetail.product.id) > -1 : false;
  }
);

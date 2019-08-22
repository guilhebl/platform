import { createReducer, on } from '@ngrx/store';

import {
  CollectionApiActions,
  CollectionPageActions,
} from '@example-app/products/actions';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
};

export const reducer = createReducer(
  initialState,
  on(CollectionPageActions.loadCollection, state => ({
    ...state,
    loading: true,
  })),
  on(CollectionApiActions.loadProductsSuccess, (state, { products }) => ({
    loaded: true,
    loading: false,
    ids: products.map(product => product.id),
  })),
  // Supports handing multiple types of actions
  on(
    CollectionApiActions.addProductSuccess,
    CollectionApiActions.removeProductFailure,
    (state, { product }) => {
      if (state.ids.indexOf(product.id) > -1) {
        return state;
      }
      return {
        ...state,
        ids: [...state.ids, product.id],
      };
    }
  ),
  on(
    CollectionApiActions.removeProductSuccess,
    CollectionApiActions.addProductFailure,
    (state, { product }) => ({
      ...state,
      ids: state.ids.filter(id => id !== product.id),
    })
  ),
  on(CollectionApiActions.clearCollection, (state, {}) => ({
    ...state,
    loading: true,
    ids: [],
  })),
  on(
    CollectionApiActions.clearCollectionFailure,
    CollectionApiActions.clearCollectionSuccess,
    (state, {}) => ({
      ...state,
      loading: false,
      ids: [],
    })
  )
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;

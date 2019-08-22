import {
  ProductApiActions,
  FindProductPageActions,
} from '@example-app/products/actions';
import { createReducer, on } from '@ngrx/store';

export interface State {
  ids: string[];
  loading: boolean;
  error: string;
  query: string;
}

const initialState: State = {
  ids: [],
  loading: false,
  error: '',
  query: '',
};

export const reducer = createReducer(
  initialState,
  on(FindProductPageActions.searchProduct, (state, { query }) => {
    // return query === ''
    //   ? {
    //       ids: [],
    //       loading: false,
    //       error: '',
    //       query,
    //     }
    //:
    return {
      ...state,
      loading: true,
      error: '',
      query,
    };
  }),
  on(ProductApiActions.searchSuccess, (state, { products }) => ({
    ids: products.map(product => product.id),
    loading: false,
    error: '',
    query: state.query,
  })),
  on(ProductApiActions.searchFailure, (state, { errorMsg }) => ({
    ...state,
    loading: false,
    error: errorMsg,
  }))
);

export const getIds = (state: State) => state.ids;

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;

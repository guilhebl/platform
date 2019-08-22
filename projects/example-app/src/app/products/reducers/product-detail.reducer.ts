import { createReducer, on } from '@ngrx/store';

import { ProductDetailActions } from '@example-app/products/actions';
import { ProductDetail } from '@example-app/products/models';

export interface State {
  loading: boolean;
  productDetail: ProductDetail | null;
}

const initialState: State = {
  loading: true,
  productDetail: null,
};

export const reducer = createReducer(
  initialState,
  on(
    ProductDetailActions.loadProductDetail,
    (state, { productDetailRequest }) => {
      return {
        ...state,
        loading: true,
        error: '',
      };
    }
  ),
  on(
    ProductDetailActions.loadProductDetailSuccess,
    (state, { productDetail }) => ({
      ...state,
      loading: false,
      error: '',
      productDetail: productDetail,
    })
  ),
  on(ProductDetailActions.loadProductDetailError, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);

export const getSelectedId = (state: State) =>
  state.productDetail ? state.productDetail.product.id : '';
export const getProductDetail = (state: State) => state.productDetail;
export const getProductDetailLoading = (state: State) => state.loading;

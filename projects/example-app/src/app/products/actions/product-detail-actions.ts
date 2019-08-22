import { createAction, props } from '@ngrx/store';

import {
  ProductDetailRequest,
  ProductDetail,
} from '@example-app/products/models';

export const loadProductDetail = createAction(
  '[Product Detail] Load',
  props<{ productDetailRequest: ProductDetailRequest }>()
);

// export class Load implements Action {
//   readonly type = OfferDetailActionTypes.Load;

//   constructor(public payload: OfferDetailRequest) {}
// }

export const loadProductDetailSuccess = createAction(
  '[Product Detail] Load Complete',
  props<{ productDetail: ProductDetail }>()
);

export const loadProductDetailError = createAction(
  '[Product Detail] Load Error',
  props<{ error: string }>()
);

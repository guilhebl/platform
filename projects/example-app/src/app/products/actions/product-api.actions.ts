import { createAction, props } from '@ngrx/store';

import { Product } from '@example-app/products/models';

export const searchSuccess = createAction(
  '[Products/API] Search Success',
  props<{ products: Product[] }>()
);

export const searchFailure = createAction(
  '[Products/API] Search Failure',
  props<{ errorMsg: string }>()
);

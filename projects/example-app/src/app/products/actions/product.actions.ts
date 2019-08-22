import { createAction, props } from '@ngrx/store';

import { Product } from '@example-app/products/models';

export const loadProduct = createAction(
  '[Product Exists Guard] Load Offer',
  props<{ product: Product }>()
);

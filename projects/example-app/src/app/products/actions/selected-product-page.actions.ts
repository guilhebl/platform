import { createAction, props } from '@ngrx/store';

import { Product } from '@example-app/products/models';

/**
 * Add Product to Collection Action
 */
export const addProduct = createAction(
  '[Selected Product Page] Add Product',
  props<{ product: Product }>()
);

/**
 * Remove Product from Collection Action
 */
export const removeProduct = createAction(
  '[Selected Product Page] Remove Product',
  props<{ product: Product }>()
);

import { createAction, props } from '@ngrx/store';

import { Product } from '@example-app/products/models';

/**
 * Add Product to Collection Actions
 */
export const addProductSuccess = createAction(
  '[Collection/API] Add Product Success',
  props<{ product: Product }>()
);

export const addProductFailure = createAction(
  '[Collection/API] Add Product Failure',
  props<{ product: Product }>()
);

/**
 * Remove Product from Collection Actions
 */
export const removeProductSuccess = createAction(
  '[Collection/API] Remove Product Success',
  props<{ product: Product }>()
);

export const removeProductFailure = createAction(
  '[Collection/API] Remove Product Failure',
  props<{ product: Product }>()
);

/**
 * Load Collection Actions
 */
export const loadProductsSuccess = createAction(
  '[Collection/API] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Collection/API] Load Products Failure',
  props<{ error: any }>()
);

/**
 * Clear Collection Action
 */
export const clearCollection = createAction(
  '[Collection Page] Clear Collection'
);

export const clearCollectionSuccess = createAction(
  '[Collection/API] Clear Collection Success'
);

export const clearCollectionFailure = createAction(
  '[Collection/API] Clear Collection Failure',
  props<{ error: any }>()
);

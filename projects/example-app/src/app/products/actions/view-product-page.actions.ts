import { createAction, props } from '@ngrx/store';

export const selectProduct = createAction(
  '[View Product Page] Select Product',
  props<{ id: string }>()
);

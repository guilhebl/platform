import { createAction, props } from '@ngrx/store';

export const searchProduct = createAction(
  '[Find Product Page] Search Products',
  props<{ query: string }>()
);

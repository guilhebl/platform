import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ProductsRoutingModule } from '@example-app/products/products-routing.module';
import {
  ProductDetailComponent,
  ProductPreviewComponent,
  ProductPreviewListComponent,
  ProductSearchComponent,
  ProductSourceComponent,
} from '@example-app/products/components';
import {
  HomePageComponent,
  CollectionPageComponent,
  FindProductPageComponent,
  SelectedProductPageComponent,
  ViewProductPageComponent,
} from '@example-app/products/containers';
import {
  ProductEffects,
  CollectionEffects,
} from '@example-app/products/effects';

import { reducers } from '@example-app/products/reducers';
import { MaterialModule } from '@example-app/material';

export const COMPONENTS = [
  ProductDetailComponent,
  ProductPreviewComponent,
  ProductPreviewListComponent,
  ProductSearchComponent,
  ProductSourceComponent,
];

export const CONTAINERS = [
  HomePageComponent,
  FindProductPageComponent,
  ViewProductPageComponent,
  SelectedProductPageComponent,
  CollectionPageComponent,
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ProductsRoutingModule,

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('products', reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([ProductEffects, CollectionEffects]),
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class ProductsModule {}

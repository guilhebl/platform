import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindProductPageComponent } from './containers/find-product-page.component';
import { ViewProductPageComponent } from './containers/view-product-page.component';
import { CollectionPageComponent } from './containers/collection-page.component';
import { HomePageComponent } from './containers/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'home',
    component: HomePageComponent,
    data: { title: 'Home' },
  },
  {
    path: 'find',
    component: FindProductPageComponent,
    data: { title: 'Find product' },
  },
  {
    path: 'collection',
    component: CollectionPageComponent,
    data: { title: 'Collection' },
  },
  {
    path: 'detail/:id',
    component: ViewProductPageComponent,
    data: { title: 'Product Detail' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}

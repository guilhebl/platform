import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundPageComponent } from '@example-app/core/containers';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'products',
    loadChildren: '@example-app/products/products.module#ProductsModule',
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    data: { title: 'Not found' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Product } from '@example-app/products/models';

@Component({
  selector: 'bc-product-source',
  template: `
    <h5 mat-subheader>Sold By:</h5>
    <span> {{ source }} </span>
  `,
  styles: [
    `
      h5 {
        margin-bottom: 5px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSourceComponent {
  @Input() product: Product;

  get source() {
    return this.product.sourceName;
  }
}

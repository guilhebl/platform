import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '@example-app/products/models';

@Component({
  selector: 'bc-product-preview-list',
  templateUrl: 'product-preview-list.component.html',
  styleUrls: ['./product-preview-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPreviewListComponent {
  @Input() products: Product[];
}

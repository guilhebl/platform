import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '@example-app/products/models';

@Component({
  selector: 'bc-product-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'product-preview.component.html',
  styleUrls: ['./product-preview.component.css'],
})
export class ProductPreviewComponent {
  @Input() product: Product;

  get id() {
    return this.product.upc ? this.product.upc : this.product.id;
  }

  get idType() {
    return this.product.upc ? 'UPC' : 'ID';
  }

  shorten(s: string): string {
    if (!s) {
      return '';
    }
    return s.length > 64 ? s.substr(0, 61) + '...' : s;
  }

  get sourceName() {
    return this.product.sourceName ? this.product.sourceName : '';
  }

  get title() {
    return this.shorten(this.product.name);
  }

  get subtitle() {
    return this.shorten(this.product.category);
  }

  get description() {
    return this.product.upc;
  }

  get source(): string {
    return this.product.sourceImageUrl;
  }

  get url(): string {
    return this.product.sourceItemDetailViewUrl;
  }

  get price(): string {
    return this.product.price.toFixed(2);
  }

  get thumbnail(): string {
    if (this.product.imageUrl) {
      return this.product.imageUrl;
    }
    return '/assets/images/image-placeholder.png';
  }
}

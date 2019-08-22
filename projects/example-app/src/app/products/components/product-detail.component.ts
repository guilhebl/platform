import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';

import { Product, ProductDetail } from '../models';

@Component({
  selector: 'bc-product-detail',
  templateUrl: 'product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {
  @Input() productDetail: ProductDetail;
  @Input() loading: boolean;
  @Input() inCollection: boolean;
  @Output() add = new EventEmitter<Product>();
  @Output() remove = new EventEmitter<Product>();

  constructor(private router: Router) {}

  get id() {
    return this.productDetail.product.upc
      ? this.productDetail.product.upc
      : this.productDetail.product.id;
  }

  get title() {
    return this.productDetail && this.productDetail.product
      ? this.productDetail.product.name
      : '';
  }

  get subtitle() {
    return this.productDetail && this.productDetail.product
      ? this.productDetail.product.category
      : '';
  }

  get source(): string {
    return this.productDetail && this.productDetail.product
      ? this.productDetail.product.sourceImageUrl
      : '';
  }

  get description() {
    if (
      this.productDetail &&
      this.productDetail.product &&
      this.productDetail.product.upc
    ) {
      return 'UPC: ' + this.productDetail.product.upc;
    }
    return '';
  }

  get price(): string {
    return this.productDetail
      ? this.productDetail.product.price.toFixed(2)
      : '';
  }

  get thumbnail(): string {
    if (this.productDetail && this.productDetail.product.imageUrl) {
      return this.productDetail.product.imageUrl;
    }
    return '/assets/images/image-placeholder.png';
  }

  buy(url: string) {
    window.open(url, '_blank');
  }

  back() {
    this.router.navigate(['/products/find']);
  }
}

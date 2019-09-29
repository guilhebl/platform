import { Product, generateMockProduct } from './product';
import { NameValue } from './name-value';
import { ProductStat } from './product-stat';

export interface ProductDetail {
  product: Product;
  description: string;
  attributes: Array<NameValue>;
  productDetailItems: Array<Product>;
  productStats: Array<ProductStat>;
}

export function generateMockProductDetail(): ProductDetail {
  return {
    product: generateMockProduct(),
    description: 'Test desc',
    attributes: [],
    productDetailItems: [],
    productStats: [],
  };
}

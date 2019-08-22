import { ProductSearchResponseSummary } from './product-search-response-summary';
import { Product } from './product';

export interface ProductSearchResponse {
  summary: ProductSearchResponseSummary;
  list: Product[];
}

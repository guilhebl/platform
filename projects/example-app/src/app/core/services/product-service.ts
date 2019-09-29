import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  Product,
  ProductDetailRequest,
  ProductDetail,
} from '@example-app/products/models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_PATH = 'http://localhost:8080/products';  

  constructor(private http: HttpClient) {}

  search(query: string): Observable<Product[]> {
    return this.http
      .get<{ list: Product[] }>(`${this.API_PATH}/search?q=${query}`)
      .pipe(map(products => products.list || []));
  }

  getProductDetail(request: ProductDetailRequest): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(
      `${this.API_PATH}/detail/${request.id}?idType=${request.idType}&source=${
        request.source
      }`
    );
  }
}

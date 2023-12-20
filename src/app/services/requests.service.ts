import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  public allProductsAPI: string =
    'https://6533baa0e1b6f4c590462eea.mockapi.io/allProducts';
  public basketProductsAPI: string =
    'https://6533baa0e1b6f4c590462eea.mockapi.io/basket';

  constructor(private http: HttpClient) {}

  requestGetAll() {
    return this.http
      .get<{ [ket: string]: Product[] }>(this.allProductsAPI)
      .pipe(
        map((res) => {
          const product = [];
          for (let key in res) {
            product.push({ ...res[key], id: key });
          }
          return product;
        })
      );
  }

  requestGetBasket() {
    return this.http
      .get<{ [ket: string]: Product[] }>(this.basketProductsAPI)
      .pipe(
        map((res) => {
          const product = [];
          for (let key in res) {
            product.push({ ...res[key], id: key });
          }
          return product;
        })
      );
  }

  requestAddBasket(product: Product) {
    return this.http.post(this.basketProductsAPI, product);
  }

  requestFilterProducts(allProducts: Product[], category: string) {
    if (category === 'all') {
      return allProducts;
    } else {
      return allProducts.filter(
        (product) => product.productCategory === category
      );
    }
  }

  requestSearchProducts(allProducts: Product[], str: string) {
    return allProducts.filter((product) => product.productName.toLowerCase().startsWith(str.toLowerCase()));
  }

  requestDeleteProduct(productId: string) {
    return this.http.delete(`${this.basketProductsAPI}/${productId}`);
  }

  
}

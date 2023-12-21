import { Component } from '@angular/core';
import { Product } from '../models/product';
import { RequestsService } from '../services/requests.service'

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent {
  public basketProduct: Product[] = [];
  public isLoading: boolean = false;
  public listEmpty: boolean = false;
  public totalPrice: number = 0;

  constructor(private request: RequestsService) {}

  ngOnInit() {
    this.productsFetch();
  }

  productsFetch(): void {
    this.isLoading = true;
    this.request.requestGetBasket().subscribe((res) => {
      this.basketProduct = res;
      this.isOrNotEmpty(res);
      this.calculateTotalPrice();
      this.isLoading = false;
    });
  }

  isOrNotEmpty(res): void {
    this.listEmpty = !res || (Array.isArray(res) && res.length === 0);
  }

  deleteFromBasket(product: Product) {
    this.request.requestDeleteProduct(product.productId).subscribe(() => {
      this.productsFetch();
    });
  }

  calculateTotalPrice() {
    this.totalPrice = this.basketProduct.reduce((total, product) => {
      return total + Math.trunc(parseFloat(product.productPrice));
    }, 0);
  }

  removeBasket() {
    this.request.requestDeleteAllProducts().subscribe(() => {
      this.productsFetch();
    });
  }
}

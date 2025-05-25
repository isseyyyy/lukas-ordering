import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-add-dishes',
  templateUrl: './add-dishes.component.html',
  styleUrls: ['./add-dishes.component.css'],
})
export class AddDishesComponent implements OnInit {
  public myAPI: string =
    'YOUR API';
  public allProduct: Product[] = [];
  public filteredProduct: Product[] = [];
  public currentCategory: string = 'all';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getProducts();
  }

  createProducts(product: Product) {
    this.http.post(this.myAPI, product).subscribe();
    console.log(product);
  }

  getProducts() {
    this.http
      .get(this.myAPI)
      .pipe(
        map((res) => {
          let product: Product[] = [];

          for (let key in res) {
            product.push({ ...res[key], id: key });
          }

          return product;
        })
      )
      .subscribe((res) => {
        this.allProduct = res;
        console.log(this.allProduct);
        // this.filterProducts('all')
      });
  }

  deleteItem(id: string) {
    this.http
      .delete('YOUR API' + id)
      .subscribe();
  }
}

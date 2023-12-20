import { Component } from '@angular/core';
import { Product, FilterOptions } from '../models/product';
import { RequestsService } from '../services/requests.service'
import { NgForm } from '@angular/forms';
      

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [RequestsService],
})
export class MainComponent {
  public allProduct: Product[] = [];
  public filteredProduct: Product[] = [];
  public currentCategory: string = 'all';
  public isLoading: boolean = false;
  public isClickedVegetarian: boolean = false;
  public isClickedNuts: boolean = false;
  public spiceText: string = 'Not Chosen';

  constructor(private request: RequestsService) {}

  ngOnInit() {
    this.productsFetch();
  }

  productsFetch() {
    this.isLoading = true;
    this.request.requestGetAll().subscribe((res) => {
      this.allProduct = res;
      this.filteredProduct = res;
      this.isLoading = false;
      this.filterProducts('all');
    });
  }

  addToBasket(product: Product) {
    this.request.requestAddBasket(product).subscribe();
  }

  filterProducts(category: string) {
    this.currentCategory = category;
    this.filteredProduct = this.request.requestFilterProducts(
      this.allProduct,
      category
    );
  }

  searching(str: string) {
    this.filteredProduct = this.request.requestSearchProducts(
      this.allProduct,
      str
    );
  }

  filterOptions: FilterOptions = {
    spiciness: 0,
    withNuts: false,
    isVegetarian: false,
  };

  changeSpiceText(spiciness: any) {
    this.spiceText = spiciness.value == 0 ? 'Not Chosen' : `${spiciness.value}`;
  }

  changeSpice(spiciness: any) {
    this.changeSpiceText(spiciness);
    this.filteredProduct = this.allProduct.filter(
      (product) => product.spiciness <= spiciness.value
    );
  }

  resetFilterForm(form: NgForm) {
    form.resetForm();
    this.productsFetch();
  }

  filterVegan(): void {
    if (this.isClickedVegetarian) {
      this.filteredProduct = this.allProduct.filter(
        (product) => product.isVegetarian === 'false'
      );
    } else {
      this.filteredProduct = this.allProduct.filter(
        (product) => product.isVegetarian === 'true'
      );
    }
  }

  filterNuts(): void {
    if(this.isClickedNuts) {
       this.filteredProduct = this.allProduct.filter(
         (product) => product.withNuts === 'true'
       );
    } else {
       this.filteredProduct = this.allProduct.filter(
         (product) => product.withNuts === 'false'
       );    
    }
  }
}

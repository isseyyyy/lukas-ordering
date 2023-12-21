export class Product {
    productId: string;
    productName: string;
    productDesc: string;
    productPrice: string;
    productImg: string;
    withNuts: string;
    isVegetarian: string;
    spiciness: number;
    productCategory: string;
    quantity: number;
    totalPrice: number
}; 

export class FilterOptions {
    withNuts: boolean;
    isVegetarian: boolean;
    spiciness: number;
};  
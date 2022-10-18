import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductType } from './productType';

@Injectable()
export class ProductService {
  products: ProductType[] = [];

  createProduct(title: string, price: number) {
    const prodID = Math.round(Math.random() * 100).toString();

    const newProduct: ProductType = {
      title,
      price,
      id: prodID,
    };

    this.products.push(newProduct);

    return prodID;
  }

  getAllProducts() {
    return [...this.products];
  }

  getProduct(id: string) {
    const product = this.products.find((product) => product.id === id);

    if (product === undefined) {
      return new NotFoundException('Could not find the product');
    } else {
      return product;
    }
  }
}

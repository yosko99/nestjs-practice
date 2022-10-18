import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductType } from './productType';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  products: ProductType[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductType>,
  ) {}

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

  async getAllProducts() {
    const products = await this.productModel.find({});

    return products;
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

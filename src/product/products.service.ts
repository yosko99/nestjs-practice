import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductType } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductType>,
  ) {}

  async createProduct(
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
  ) {
    const newProduct = new this.productModel({
      title,
      price,
      description,
      category,
      image,
    });

    await newProduct.save();

    return newProduct._id;
  }

  async getAllProducts() {
    const products = await this.productModel.find({});

    return products;
  }

  async getProduct(id: string) {
    const product = await this.productModel.find({ _id: id });

    if (product === null) {
      return new NotFoundException('Could not find the product');
    } else {
      return product;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductType } from './product/product.model';
import * as productData from '../data/products.json';
import { Seeder } from 'nestjs-seeder';

@Injectable()
export class ProductsSeeder implements Seeder {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductType>,
  ) {}

  async seed(): Promise<any> {
    return this.productModel.insertMany(productData);
  }

  async drop(): Promise<any> {
    return this.productModel.deleteMany({});
  }
}

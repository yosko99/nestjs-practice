import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { productSchema } from './product.model';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';

import dotenv = require('dotenv');
import { response } from 'express';
dotenv.config();

describe('ProductController', () => {
  let productController: ProductController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
      imports: [
        MongooseModule.forFeature([{ name: 'Product', schema: productSchema }]),
        MongooseModule.forRoot(process.env.MONGO_URI),
      ],
    }).compile();

    productController = app.get<ProductController>(ProductController);
  });

  it('get all products', () => {
    productController.getAllProducts().then((response) => {
      expect(response).toBe([]);
    });
  });
});

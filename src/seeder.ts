import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsSeeder } from './products.seeder';
import { ProductType, productSchema } from 'src/product/product.model';

import dotenv = require('dotenv');
dotenv.config();

seeder({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: 'Product', schema: productSchema }]),
  ],
}).run([ProductsSeeder]);

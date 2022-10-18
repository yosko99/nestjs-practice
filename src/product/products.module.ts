import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './products.service';
import { productSchema } from './product.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: productSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  createProduct(@Body('title') title: string, @Body('price') price: number) {
    return this.productService.createProduct(title, price);
  }

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('/:id')
  getProduct(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }
}

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  createProduct(
    @Body('title') title: string,
    @Body('price') price: number,
    @Body('description') description: string,
    @Body('category') category: string,
    @Body('image') image: string,
  ) {
    return this.productService.createProduct(
      title,
      price,
      description,
      category,
      image,
    );
  }

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('/:id')
  getProduct(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }

  @Put('/:id')
  updateProduct(@Param('id') id: string, @Body('title') title: string) {
    return this.productService.updateProduct(id, title);
  }
}

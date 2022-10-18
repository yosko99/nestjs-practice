import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/products.module';
import { TestController } from './test/test.controller';

@Module({
  imports: [ProductModule],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}

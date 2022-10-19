import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/products.module';
import { TestController } from './test/test.controller';

import { CheckIDMiddleware } from './product/checkID.middleware';

import { TestMiddleware } from './product/test.middleware';
import dotenv = require('dotenv');
dotenv.config();

@Module({
  imports: [ProductModule, MongooseModule.forRoot(process.env.MONGO_URI)],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIDMiddleware).forRoutes({
      path: 'products/:id',
      method: RequestMethod.GET,
    });
    consumer.apply(TestMiddleware).forRoutes('*');
  }
}

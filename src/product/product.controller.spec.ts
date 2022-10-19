import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import * as mongoose from 'mongoose';

import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';

import dotenv = require('dotenv');
dotenv.config();

describe('ProductController', () => {
  const productStructure = {
    id: expect.any(String),
    title: expect.any(String),
    price: expect.any(Number),
    description: expect.any(String),
    category: expect.any(String),
    image: expect.any(String),
    categoryURL: expect.any(String),
    rating: expect.objectContaining({
      rate: expect.any(Number),
      count: expect.any(Number),
    }),
    translations: expect.any(Array),
  };

  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    mongoose.disconnect();
  });

  test('get all products', () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([expect.objectContaining(productStructure)]),
        );
      });
  });
});

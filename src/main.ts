import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';
import * as bodyParser from 'body-parser';
import { ExpressAdapter } from '@nestjs/platform-express';

const server = express();

let isInitialized = false;

export async function createNestServer(): Promise<express.Express> {
  if (!isInitialized) {
    server.use(bodyParser.json());
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

    app.enableCors({
      origin: [
        'https://duckling-shop-client.vercel.app',
        'http://localhost:3001',
        'https://duckling-shop-client-git-develop-paolas-projects-a3e71503.vercel.app',
      ],
      allowedHeaders: ['Content-Type'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
    isInitialized = true;
  }

  return server;
}

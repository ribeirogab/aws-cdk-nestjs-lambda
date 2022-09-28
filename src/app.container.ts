import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';

import { AppModule } from './app.module';
import { AppService } from './app.service';

let app: INestApplication;
let appService: AppService;

const bootstrap = async () => {
  if (!app) {
    app = await NestFactory.create(AppModule);
    await app.init();
  }
};

export const container = async () => {
  await bootstrap();

  if (!appService) {
    const appContext = await NestFactory.createApplicationContext(AppModule);
    appService = appContext.get(AppService);
  }

  return { appService };
};

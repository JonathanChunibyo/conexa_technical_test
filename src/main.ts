import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// Documentation
import { swaggerInit } from './documentation/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  swaggerInit(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

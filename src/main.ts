import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // auto validation của nestJS
  app.useGlobalPipes(
    new ValidationPipe({
      // kiểm tra user nhập vào bị thừa hay ko
      whitelist: true,
    }),
  );

  //  Thêm version (path: api)cho các page. ex: http://localhost:7777/api/user
  //  { exclude: ['']} : trả về trang chủ ko cần path /api. ex: http://localhost:7777
  app.setGlobalPrefix('api', { exclude: [''] });
  await app.listen(process.env.PORT ?? 7778);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TskvLogger } from './logger/tskv.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api/afisha');

  app.enableCors({
  origin: [
    'http://film-project.students.nomorepartiessite.ru',
    'https://film-project.students.nomorepartiessite.ru'
  ],
});
  app.useLogger(new TskvLogger());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const port = configService.get<number>('PORT', 3000);

  await app.listen(port, '0.0.0.0');
}

bootstrap();

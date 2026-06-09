import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'node:path';

import { FilmEntity } from './entities/film.entity';
import { ScheduleEntity } from './entities/schedule.entity';

import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',

        url: configService.get<string>('DATABASE_URL'),

        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),

        entities: [FilmEntity, ScheduleEntity],

        synchronize: false,
        logging: false,
      }),
    }),

    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'public/content/afisha'),
      serveRoot: '/content/afisha',
      serveStaticOptions: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        etag: true,
      },
    }),

    FilmsModule,
    OrderModule,
  ],
})
export class AppModule {}

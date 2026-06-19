import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

import { DataSource } from 'typeorm';
import { FilmEntity } from './entities/film.entity';
import { ScheduleEntity } from './entities/schedule.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',

  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),

  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,

  database: process.env.DATABASE_NAME,

  schema: 'public',

  entities: [
    FilmEntity,
    ScheduleEntity,
  ],

  migrations: [
    'src/migrations/*.ts',
  ],

  synchronize: false,

  logging: true,
});
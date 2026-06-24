import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

import { FilmsRepository } from '../repository/film.repository';
import { PostgresFilmsRepository } from '../repository/postgres-films.repository';

import { FilmEntity } from '../entities/film.entity';
import { ScheduleEntity } from '../entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FilmEntity, ScheduleEntity])],

  controllers: [FilmsController],

  providers: [
    FilmsService,
    {
      provide: FilmsRepository,
      useClass: PostgresFilmsRepository,
    },
  ],

  exports: [FilmsService, FilmsRepository],
})
export class FilmsModule {}

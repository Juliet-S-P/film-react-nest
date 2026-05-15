import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

import { Film, FilmSchema } from './schema/film.schema';
import { FilmsRepository } from '../repository/film.repository';
import { MongoFilmsRepository } from '../repository/mongo-films.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [FilmsController],
  providers: [
    FilmsService,
    {
      provide: FilmsRepository,
      useClass: MongoFilmsRepository,
    },
  ],
  exports: [FilmsService, FilmsRepository],
})
export class FilmsModule {}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FilmsRepository } from './film.repository';
import { Film, FilmDocument, Schedule } from '../films/schema/film.schema';

@Injectable()
export class MongoFilmsRepository extends FilmsRepository {
  constructor(
    @InjectModel(Film.name)
    private readonly filmModel: Model<FilmDocument>,
  ) {
    super();
  }

  async findAll(): Promise<Film[]> {
    return this.filmModel.find({}, { _id: 0, __v: 0 }).lean();
  }

  async findById(id: string): Promise<Film | null> {
    return this.filmModel.findOne({ id }, { _id: 0, __v: 0 }).lean();
  }

  async findSchedule(
    filmId: string,
    sessionId: string,
  ): Promise<Schedule | null> {
    const film = await this.filmModel
      .findOne({
        id: filmId,
        'schedule.id': sessionId,
      })
      .lean();

    if (!film) {
      return null;
    }

    return film.schedule.find((schedule) => schedule.id === sessionId) || null;
  }

  async updateTakenSeats(
    filmId: string,
    sessionId: string,
    seats: string[],
  ): Promise<boolean> {
    const result = await this.filmModel.updateOne(
      {
        id: filmId,
        'schedule.id': sessionId,
        'schedule.taken': { $nin: seats },
      },
      {
        $addToSet: {
          'schedule.$.taken': { $each: seats },
        },
      },
    );

    return result.matchedCount > 0 && result.modifiedCount > 0;
  }
}

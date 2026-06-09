import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FilmsRepository } from './film.repository';

import { Film } from '../films/interfaces/film.interface';
import { Schedule } from '../films/interfaces/schedule.interface';

import { FilmEntity } from '../entities/film.entity';
import { ScheduleEntity } from '../entities/schedule.entity';

@Injectable()
export class PostgresFilmsRepository extends FilmsRepository {
  constructor(
    @InjectRepository(FilmEntity)
    private readonly filmRepository: Repository<FilmEntity>,

    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
  ) {
    super();
  }

  private mapFilm(film: FilmEntity): Film {
    return {
      id: film.id,
      rating: film.rating,
      director: film.director,

      tags: film.tags ? film.tags.split(',') : [],

      image: film.image,
      cover: film.cover,
      title: film.title,
      about: film.about,
      description: film.description,

      schedule: (film.schedule ?? []).map((schedule) => ({
        id: schedule.id,
        daytime: schedule.daytime,
        hall: schedule.hall,
        rows: schedule.rows,
        seats: schedule.seats,
        price: schedule.price,

        taken: schedule.taken ? schedule.taken.split(',') : [],
      })),
    };
  }

  async findAll(): Promise<Film[]> {
    const films = await this.filmRepository.find({
      relations: {
        schedule: true,
      },
    });

    return films.map((film) => this.mapFilm(film));
  }

  async findById(id: string): Promise<Film | null> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: {
        schedule: true,
      },
    });

    if (!film) {
      return null;
    }

    return this.mapFilm(film);
  }

  async findSchedule(
    filmId: string,
    sessionId: string,
  ): Promise<Schedule | null> {
    const schedule = await this.scheduleRepository.findOne({
      where: {
        id: sessionId,
        film: {
          id: filmId,
        },
      },
      relations: {
        film: true,
      },
    });

    if (!schedule) {
      return null;
    }

    return {
      id: schedule.id,
      daytime: schedule.daytime,
      hall: schedule.hall,
      rows: schedule.rows,
      seats: schedule.seats,
      price: schedule.price,

      taken: schedule.taken ? schedule.taken.split(',') : [],
    };
  }

  async updateTakenSeats(
    filmId: string,
    sessionId: string,
    seats: string[],
  ): Promise<boolean> {
    const schedule = await this.scheduleRepository.findOne({
      where: {
        id: sessionId,
        film: { id: filmId },
      },
    });

    if (!schedule) return false;

    const taken = schedule.taken
      ? schedule.taken.split(',').filter(Boolean)
      : [];

    const uniqueSeats = [...new Set(seats)];

    const alreadyTaken = uniqueSeats.some((seat) => taken.includes(seat));

    if (alreadyTaken) {
      return false;
    }

    const updatedTaken = [...taken, ...uniqueSeats];

    await this.scheduleRepository.update(
      { id: sessionId },
      { taken: updatedTaken.join(',') },
    );

    return true;
  }
}

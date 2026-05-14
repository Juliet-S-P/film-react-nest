import { Injectable } from '@nestjs/common';
import { FilmsRepository } from './film.repository';
import { Film, Schedule } from '../films/schema/film.schema';
import * as data from '../../test/mongodb_initial_stub.json';

@Injectable()
export class InMemoryFilmsRepository extends FilmsRepository {
  private films: Film[] = data as Film[];

  async findAll(): Promise<Film[]> {
    return this.films;
  }

  async findById(id: string): Promise<Film | null> {
    return this.films.find((f) => f.id === id) || null;
  }

  async findSchedule(
    filmId: string,
    sessionId: string,
  ): Promise<Schedule | null> {
    const film = await this.findById(filmId);

    if (!film) {
      return null;
    }

    return film.schedule.find((schedule) => schedule.id === sessionId) || null;
  }

  async updateTakenSeats(
    filmId: string,
    sessionId: string,
    seats: string[],
  ): Promise<void> {
    const schedule = await this.findSchedule(filmId, sessionId);

    if (!schedule) {
      return;
    }

    schedule.taken.push(...seats);
  }
}

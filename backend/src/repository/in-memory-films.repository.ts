import { Injectable } from '@nestjs/common';

import { FilmsRepository } from './film.repository';

import { Film } from '../films/interfaces/film.interface';
import { Schedule } from '../films/interfaces/schedule.interface';

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

    if (!film) return null;

    return film.schedule.find((s) => s.id === sessionId) || null;
  }

  async updateTakenSeats(
    filmId: string,
    sessionId: string,
    seats: string[],
  ): Promise<boolean> {
    const schedule = await this.findSchedule(filmId, sessionId);

    if (!schedule) return false;

    const taken = schedule.taken ?? [];

    const hasConflict = seats.some((seat) => taken.includes(seat));

    if (hasConflict) return false;

    schedule.taken = Array.from(new Set([...taken, ...seats]));

    return true;
  }
}

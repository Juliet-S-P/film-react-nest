import { Film, Schedule } from '../films/schema/film.schema';

export abstract class FilmsRepository {
  abstract findAll(): Promise<Film[]>;
  abstract findById(id: string): Promise<Film | null>;

  abstract findSchedule(
    filmId: string,
    sessionId: string,
  ): Promise<Schedule | null>;

  abstract updateTakenSeats(
    filmId: string,
    sessionId: string,
    seats: string[],
  ): Promise<void>;
}

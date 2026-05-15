import { Inject, Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/film.repository';
import { Film } from './schema/film.schema';

@Injectable()
export class FilmsService {
  constructor(
    @Inject(FilmsRepository)
    private readonly filmsRepository: FilmsRepository,
  ) {}

  async getAll(): Promise<Film[]> {
    return this.filmsRepository.findAll();
  }

  async getById(id: string): Promise<Film | null> {
    return this.filmsRepository.findById(id);
  }
}

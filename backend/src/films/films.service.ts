import { Inject, Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/film.repository';
import { FilmDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(
    @Inject(FilmsRepository)
    private readonly filmsRepository: FilmsRepository,
  ) {}

  async getAll(): Promise<FilmDto[]> {
    return this.filmsRepository.findAll();
  }

  async getById(id: string): Promise<FilmDto | null> {
    return this.filmsRepository.findById(id);
  }
}

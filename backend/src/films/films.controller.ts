import { Controller, Get, Param, NotFoundException } from '@nestjs/common';

import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAll() {
    const items = await this.filmsService.getAll();

    return {
      total: items.length,
      items,
    };
  }

  @Get(':id/schedule')
  async getSchedule(@Param('id') id: string) {
    const film = await this.filmsService.getById(id);

    if (!film) {
      throw new NotFoundException('Film not found');
    }

    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }
}

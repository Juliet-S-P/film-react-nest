import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { randomUUID } from 'crypto';
import { FilmsRepository } from '../repository/film.repository';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject(FilmsRepository)
    private readonly filmsRepository: FilmsRepository,
  ) {}

  async createOrder(dto: CreateOrderDto) {
    const { film, session, row, seat } = dto;

    const foundFilm = await this.filmsRepository.findById(film);

    if (!foundFilm) {
      throw new NotFoundException(`Film not found: ${film}`);
    }

    const foundSession = await this.filmsRepository.findSchedule(
      film,
      session,
    );

    if (!foundSession) {
      throw new NotFoundException(`Session not found: ${session}`);
    }

    const seatKey = `${row}:${seat}`;

    if (foundSession.taken.includes(seatKey)) {
      throw new BadRequestException(`Seat already taken: ${seatKey}`);
    }

    await this.filmsRepository.updateTakenSeats(film, session, [seatKey]);

    return {
      id: randomUUID(),
      film,
      session,
      daytime: foundSession.daytime,
      row,
      seat,
      price: foundSession.price,
    };
  }
}
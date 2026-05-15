import {
  Injectable,
  Inject,
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

  async createOrders(dto: CreateOrderDto | CreateOrderDto[]) {
    const orders = Array.isArray(dto) ? dto : [dto];

    const items = [];

    for (const order of orders) {
      const seatKey = `${order.row}:${order.seat}`;

      const success = await this.filmsRepository.updateTakenSeats(
        order.film,
        order.session,
        [seatKey],
      );

      if (!success) {
        throw new BadRequestException('Seat already taken');
      }

      items.push({
        id: randomUUID(),
        ...order,
      });
    }

    return { total: items.length, items };
  }
}

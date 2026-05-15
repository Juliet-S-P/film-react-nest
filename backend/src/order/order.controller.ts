import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() dto: CreateOrderDto[]) {
    return this.orderService.createOrders(dto);
  }
}

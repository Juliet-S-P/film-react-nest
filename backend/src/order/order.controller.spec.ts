import { Test } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [OrderController],

      providers: [
        {
          provide: OrderService,

          useValue: {
            createOrders: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

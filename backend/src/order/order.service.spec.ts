import { Test } from '@nestjs/testing';
import { OrderService } from './order.service';
import { FilmsRepository } from '../repository/film.repository';
import { CreateOrderDto } from './dto/order.dto';

describe('OrderService', () => {
  let service: OrderService;

  let repository: FilmsRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        OrderService,

        {
          provide: FilmsRepository,

          useValue: {
            updateTakenSeats: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);

    repository = module.get<FilmsRepository>(FilmsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create order', async () => {
    jest.spyOn(repository, 'updateTakenSeats').mockResolvedValue(true);

    const result = await service.createOrders({
  film: '1',
  session: '1',
  daytime: '2026-06-24',
  row: 1,
  seat: 2,
  price: 500,
} satisfies CreateOrderDto);

    expect(result.total).toBe(1);
  });
});

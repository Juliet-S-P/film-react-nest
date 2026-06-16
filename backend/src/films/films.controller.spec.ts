import { Test } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [FilmsController],

      providers: [
        {
          provide: FilmsService,

          useValue: {
            getAll: jest.fn(),

            getById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

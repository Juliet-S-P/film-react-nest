import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FilmsRepository } from '../repository/film.repository';

describe('FilmsService', () => {
  let service: FilmsService;

  let repository: FilmsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,

        {
          provide: FilmsRepository,

          useValue: {
            findAll: jest.fn(),

            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);

    repository = module.get<FilmsRepository>(FilmsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call repository findAll', async () => {
    jest.spyOn(repository, 'findAll').mockResolvedValue([]);

    const result = await service.getAll();

    expect(repository.findAll).toHaveBeenCalled();

    expect(result).toEqual([]);
  });
});

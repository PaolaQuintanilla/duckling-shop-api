import { Test, TestingModule } from '@nestjs/testing';
import { DucksController } from './ducks.controller';
import { DucksService } from '../services/ducks.service';
import { CreateDuckDto } from '../dtos/create-duck.dto';
import { UpdateDuckDto } from '../dtos/update-duck.dto';
import { ColorEnum } from '../../../common/enums/color.enum';
import { SizeEnum } from '../../../common/enums/size.enum';

describe('DucksController', () => {
  let controller: DucksController;
  let service: DucksService;

  const mockDucksService = {
    createOrUpdateDuck: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    softDeleteDuck: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DucksController],
      providers: [
        {
          provide: DucksService,
          useValue: mockDucksService,
        },
      ],
    }).compile();

    controller = module.get<DucksController>(DucksController);
    service = module.get<DucksService>(DucksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call createOrUpdateDuck on create', () => {
    const dto: CreateDuckDto = {
      quantity: 45,
      duckId: '',
      color: ColorEnum.Red,
      size: SizeEnum.XLarge,
      price: 20,
    };
    controller.create(dto);
    expect(service.createOrUpdateDuck).toHaveBeenCalledWith(dto);
  });

  it('should call findAll', () => {
    controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call findOne with id', () => {
    controller.findOne('123');
    expect(service.findOne).toHaveBeenCalledWith('123');
  });

  it('should call update with id and dto', () => {
    const dto: UpdateDuckDto = { color: ColorEnum.Red };
    controller.update('456', dto);
    expect(service.update).toHaveBeenCalledWith('456', dto);
  });

  it('should call softDeleteDuck and return formatted message', async () => {
    const duckMock = { id: '789', name: 'Scrooge' };
    mockDucksService.softDeleteDuck.mockResolvedValue(duckMock);

    const result = await controller.eraseDuck('789');

    expect(service.softDeleteDuck).toHaveBeenCalledWith('789');
    expect(result).toEqual({
      message: 'Duck with id 789 has been marked as erased',
      duck: duckMock,
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { DuckRepository } from './duck.repository';
import { Duck } from '../schemas/duck.schema';
import { ApplicationExceptions } from '../../../common/exceptions/application.exceptions';
import { mongo, Error as MongooseError } from 'mongoose';

describe('DuckRepository', () => {
  let repository: DuckRepository;
  let duckModelMock: jest.Mock;
  let exceptions: ApplicationExceptions;

  const mockApplicationExceptions = {
    notFoundException: jest.fn(),
    badRequestException: jest.fn(),
  };

  beforeEach(async () => {
    duckModelMock = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DuckRepository,
        {
          provide: getModelToken(Duck.name),
          useValue: duckModelMock,
        },
        {
          provide: ApplicationExceptions,
          useValue: mockApplicationExceptions,
        },
      ],
    }).compile();

    repository = module.get<DuckRepository>(DuckRepository);
    duckModelMock = module.get(getModelToken(Duck.name));
    exceptions = module.get(ApplicationExceptions);

    duckModelMock.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({
        _id: 'someId',
        color: 'red',
        size: 'XLarge',
        quantity: 10,
        price: 25,
        isErased: false,
      }),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a duck successfully', async () => {
    const duckEntity = {
      color: 'red',
      size: 'XLarge',
      quantity: 10,
      price: 25,
      isErased: false,
    };

    const savedDuck = { ...duckEntity, _id: '123' };

    duckModelMock.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(savedDuck),
    }));

    const result = await repository.create(duckEntity as any);

    expect(result).toEqual(savedDuck);
  });

  it('should handle Mongoose ValidationError on create', async () => {
    const duckEntity = {
      color: 'blue',
      size: 'XLarge',
      quantity: 10,
      price: 25,
      isErased: false,
    };

    const error = new MongooseError.ValidationError(null);
    duckModelMock.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(error),
    }));

    await repository.create(duckEntity as any);

    expect(exceptions.notFoundException).toHaveBeenCalledWith(
      'Data schema does not match the entity',
    );
  });

  it('should handle MongoServerError (code 11000) on create', async () => {
    const error = new mongo.MongoServerError({ code: 11000 });

    duckModelMock.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(error),
    }));

    await repository.create({} as any);

    expect(exceptions.notFoundException).toHaveBeenCalledWith(error.message);
  });

  it('should handle Mongoose CastError on create', async () => {
    const error = new MongooseError.CastError('ObjectId', 'bad_id', 'id');

    duckModelMock.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(error),
    }));

    await repository.create({} as any);

    expect(exceptions.notFoundException).toHaveBeenCalledWith(error.message);
  });

  it('should handle unknown error on create', async () => {
    const error = new Error('Unexpected error');

    duckModelMock.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(error),
    }));

    await repository.create({} as any);

    expect(exceptions.notFoundException).toHaveBeenCalledWith(error.message);
  });
});

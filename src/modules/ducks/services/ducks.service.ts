import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CreateDuckDto } from '../dtos/create-duck.dto';
import { UpdateDuckDto } from '../dtos/update-duck.dto';
import { DuckDto } from '../dtos/duck.dto';

import { DuckRepository } from '../repositories/duck.repository';

import { ApplicationExceptions } from '../../../common/exceptions/application.exceptions';
import { DuckEntity } from '../domain/Duck';
import { Result } from '../domain/Result';
import { Duck } from '../schemas/duck.schema';
import { ColorEnum } from '../domain/color.enum';

@Injectable()
export class DucksService {
  constructor(
    private exception: ApplicationExceptions,
    private readonly duckRepo: DuckRepository,
  ) { }

  async createOrUpdateDuck(createDuckDto: CreateDuckDto) {
    const { color, size, price, quantity } = createDuckDto;

    const colorEnumValue = color.toLowerCase() as ColorEnum;

    if (!Object.values(ColorEnum).includes(colorEnumValue)) {
      throw new Error(`Invalid color: ${color}`);
    }

    const existingDuck = await this.duckRepo.findByColorSizeAndPrice(
      colorEnumValue,
      size,
      price,
    );

    if (existingDuck) {
      return this.duckRepo.updateQuantity(existingDuck, quantity);
    }

    const result: Result<DuckEntity, Error> = DuckEntity.createDuck({
      color: colorEnumValue,
      size,
      quantity,
      price,
    });

    if (result.isFailure) {
      this.exception.badRequestException(result.error.message);
    }

    const validDuck = result.value;
    const createDuckDb: Partial<Duck> =
      this.mapDuckEntityToPersistence(validDuck);
    return await this.duckRepo.create(createDuckDb);
  }

  mapDuckEntityToPersistence(entity: DuckEntity): Partial<Duck> {
    return {
      color: entity.color,
      size: entity.size,
      quantity: entity.quantity,
      price: entity.price,
      isErased: entity.isErased,
    };
  }

  async findAll() {
    const ducks: Duck[] = await this.duckRepo.findAll();

    const duckDtos: DuckDto[] = ducks.map((duck) => ({
      _id: duck.id,
      color: duck.color,
      size: duck.size,
      quantity: duck.quantity,
      price: duck.price,
    }));

    return duckDtos;
  }

  async findOne(id: string): Promise<DuckDto> {
    const duck = await this.duckRepo.findById(id);
    if (!duck) this.exception.notFoundException('Duck not found');
    return plainToInstance(DuckDto, duck.toObject());
  }

  // async update(id: string, dto: UpdateDuckDto) {
  //   const duck = await this.duckRepo.update(id, dto);
  //   if (!duck) this.exception.notFoundException('Duck not found');
  //   return duck;
  // }

  async softDeleteDuck(id: string) {
    const duck = await this.duckRepo.findById(id);

    if (!duck) {
      this.exception.notFoundException(`Duck with id ${id} not found`);
    }

    duck.isErased = true;

    return duck.save();
  }
}

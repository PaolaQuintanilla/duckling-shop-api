import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CreateDuckDto } from '../dtos/create-duck.dto';
import { UpdateDuckDto } from '../dtos/update-duck.dto';
import { DuckDto } from '../dtos/duck.dto';

import { DuckRepository } from '../repositories/duck.repository';

import { ApplicationExceptions } from '../../../common/exceptions/application.exceptions';

@Injectable()
export class DucksService {
  constructor(
    private exception: ApplicationExceptions,
    private readonly duckRepo: DuckRepository,
  ) {}

  async createOrUpdateDuck(createDuckDto: CreateDuckDto) {
    const { color, size, price, quantity } = createDuckDto;

    const existingDuck = await this.duckRepo.findByColorSizeAndPrice(
      color,
      size,
      price,
    );

    if (existingDuck) {
      return this.duckRepo.updateQuantity(existingDuck, quantity);
    } else {
      return this.duckRepo.create(createDuckDto);
    }
  }

  async findAll() {
    return this.duckRepo.findAll();
  }

  async findOne(id: string): Promise<DuckDto> {
    const duck = await this.duckRepo.findById(id);
    if (!duck) this.exception.notFoundException('Duck not found');
    return plainToInstance(DuckDto, duck.toObject());
  }

  async update(id: string, dto: UpdateDuckDto) {
    const duck = await this.duckRepo.update(id, dto);
    if (!duck) this.exception.notFoundException('Duck not found');
    return duck;
  }

  async softDeleteDuck(id: string) {
    const duck = await this.duckRepo.findById(id);

    if (!duck) {
      this.exception.notFoundException(`Duck with id ${id} not found`);
    }

    duck.isErased = true;

    return duck.save();
  }
}

import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CreateDuckDto } from '../dtos/create-duck.dto';
import { UpdateDuckDto } from '../dtos/update-duck.dto';
import { DuckDto } from '../dtos/duck.dto';

import { DuckRepository } from '../repositories/duck.repository';

import { ApplicationExceptions } from '../../../common/exceptions/application.exceptions';
import { Duck } from '../schemas/duck.schema';

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
    const duck = await this.duckRepo.findById(id);
    if (!duck) this.exception.notFoundException('Duck not found');

    const updateFields: Partial<Duck> = {};

    if (dto.size) updateFields.size = dto.size;
    if (dto.price) updateFields.price = dto.price;

    const updatedDuck = await this.duckRepo.update(id, updateFields);
    return updatedDuck;
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

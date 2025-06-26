import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDuckDto } from '../dtos/create-duck.dto';
import { UpdateDuckDto } from '../dtos/update-duck.dto';
import { DuckRepository } from '../repositories/duck.repository';

@Injectable()
export class DucksService {
  constructor(private readonly duckRepo: DuckRepository) {}

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

  async findOne(id: string) {
    const duck = await this.duckRepo.findOne(id);
    if (!duck) throw new NotFoundException('Duck not found');
    return duck;
  }

  async update(id: string, dto: UpdateDuckDto) {
    const duck = await this.duckRepo.update(id, dto);
    if (!duck) throw new NotFoundException('Duck not found');
    return duck;
  }

  async softDeleteDuck(id: string) {
    const duck = await this.duckRepo.findById(id);

    if (!duck) {
      throw new NotFoundException(`Duck with id ${id} not found`);
    }
    duck.isErased = true;

    return duck.save();
  }
}

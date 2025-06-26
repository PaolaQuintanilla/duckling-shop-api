import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Duck } from '../schemas/duck.schema';
import { plainToClass } from 'class-transformer';
import { DuckDto } from '../dtos/duck.dto';

@Injectable()
export class DuckRepository {
  constructor(@InjectModel(Duck.name) private duckModel: Model<Duck>) {}

  create(data: Partial<Duck>): Promise<Duck> {
    const created = new this.duckModel(data);
    return created.save();
  }

  findAll(): Promise<Duck[]> {
    return this.duckModel
      .find({ isErased: false })
      .sort({ quantity: -1 })
      .exec();
  }

  async findByColorSizeAndPrice(
    color: string,
    size: string,
    price: number,
  ): Promise<Duck | null> {
    return this.duckModel
      .findOne({ color, size, price, isErased: false })
      .exec();
  }

  async findOne(id: string): Promise<DuckDto> {
    const duck = await this.duckModel
      .findOne({ _id: id, isErased: false })
      .exec();

    if (!duck) {
      throw new NotFoundException(
        `Duck with id ${id} not found or has been erased`,
      );
    }

    return plainToClass(DuckDto, duck.toObject());
  }

  async findById(id: string): Promise<Duck> {
    const duck = await this.duckModel
      .findOne({ _id: id, isErased: false })
      .exec();

    if (!duck) {
      throw new NotFoundException(
        `Duck with id ${id} not found or has been erased`,
      );
    }

    return duck;
  }

  update(id: string, data: Partial<Duck>): Promise<Duck> {
    return this.duckModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async updateQuantity(duck: Duck, quantityToAdd: number): Promise<Duck> {
    duck.quantity += quantityToAdd;
    return duck.save();
  }
}

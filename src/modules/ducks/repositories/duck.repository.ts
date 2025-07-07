import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Duck } from '../schemas/duck.schema';
import { DuckEntity } from '../domain/Duck';
import { ApplicationExceptions } from '../../../common/exceptions/application.exceptions';
import {
  Error as MongooseError,
  mongo,
  Model,
  isValidObjectId,
} from 'mongoose';
@Injectable()
export class DuckRepository {
  constructor(
    @InjectModel(Duck.name) private duckModel: Model<Duck>,
    private exception: ApplicationExceptions,
  ) { }

  async create(duckEntity: DuckEntity): Promise<Duck> {
    return await this.saveAsync(duckEntity);
  }

  async saveAsync(duckEntity: DuckEntity) {
    try {
      const data: Partial<Duck> = this.mapDuckEntityToPersistence(duckEntity);
      const created = new this.duckModel(data);

      return await created.save();
    } catch (error) {
      if (error instanceof MongooseError.ValidationError) {
        this.exception.notFoundException(
          'Data schema does not match the entity',
        );
      }

      if (error instanceof mongo.MongoServerError && error.code === 11000) {
        this.exception.notFoundException(error.message);
      }

      if (error instanceof MongooseError.CastError) {
        this.exception.notFoundException(error.message);
      }

      this.exception.notFoundException(error.message);
    }
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

  async findAll(): Promise<Duck[]> {
    return await this.duckModel
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

  async findById(id: string): Promise<DuckEntity> {
    this.idValidation(id);

    const duck = await this.duckModel
      .findOne({ _id: id, isErased: false })
      .exec();

    if (!duck) {
      this.exception.notFoundException(`A duck with id: ${id} was not found`);
    }

    return DuckEntity.hidrate({
      id: duck.id,
      color: duck.color,
      size: duck.size,
      price: duck.price,
      quantity: duck.quantity,
    });
  }

  idValidation(id: string) {
    const isValid = true;
    if (!isValidObjectId(id)) {
      this.exception.badRequestException('Not valid id');
    }

    return isValid;
  }

  update(id: string, duckEntity: DuckEntity): Promise<Duck> {
    try {
      this.idValidation(id);
      const data: Partial<Duck> = this.mapDuckEntityToPersistence(duckEntity);

      return this.duckModel.findByIdAndUpdate(id, data, { new: true }).exec();
    } catch (error) {
      if (error instanceof MongooseError.ValidationError) {
        this.exception.notFoundException(
          'Dabata schema does not mache the entity',
        );
      }

      if (error instanceof mongo.MongoServerError && error.code === 11000) {
        this.exception.notFoundException(error.message);
      }

      if (error instanceof MongooseError.CastError) {
        this.exception.notFoundException(error.message);
      }

      this.exception.notFoundException(error.message);
    }
  }

  async updateQuantity(duck: Duck, quantityToAdd: number): Promise<Duck> {
    duck.quantity += quantityToAdd;
    return duck.save();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Duck } from '../schemas/duck.schema';

@Injectable()
export class DuckRepository {
  constructor(@InjectModel(Duck.name) private duckModel: Model<Duck>) {}

  create(data: Partial<Duck>): Promise<Duck> {
    const created = new this.duckModel(data);
    return created.save();
  }

  findAll(): Promise<Duck[]> {
    return this.duckModel.find().exec();
  }

  findOne(id: string): Promise<Duck> {
    return this.duckModel.findById(id).exec();
  }

  update(id: string, data: Partial<Duck>): Promise<Duck> {
    return this.duckModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  delete(id: string): Promise<Duck> {
    return this.duckModel.findByIdAndDelete(id).exec();
  }
}

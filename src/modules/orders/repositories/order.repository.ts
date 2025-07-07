import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';
import { OrderEntity } from '../domain/entities/order';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(orderEntity: OrderEntity): Promise<Order> {
    const orderToSave = this.mapDuckEntityToPersistence(orderEntity);
    const newOrder = new this.orderModel(orderToSave);
    return newOrder.save();
  }

  mapDuckEntityToPersistence(entity: OrderEntity): Partial<Order> {
    return {
      duckId: entity.id,
      color: entity.color,
      size: entity.size,
      amountDucks: entity.amountDucks,
      destinyCountry: entity.destinyCountry,
      shippingType: entity.shippingType,
      packageType: entity.package.getPackagingType(),
      filler: entity.filler,
      discounts: entity.discount,
      increments: entity.increments,
      finalPrice: entity.finalPrice,
    };
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderModel.find().exec();

    return orders;
  }
}

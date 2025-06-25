import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { Order } from '../schemas/order.schema';
import { PackageFactory } from '../../packages/package-factory';
import { FillerFactory } from '../../fillers/filler-factory';
import { OrderResponseDto } from '../dtos/order-response.dto';
import { PriceCalculator } from '../../../common/utils/price-calculator';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly priceCalculator: PriceCalculator,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { size, shippingType, color, amountDucks, destinyCountry } =
      createOrderDto;

    //packaging and filler
    const packageDuck = PackageFactory.createPackage(size);
    const fillerStrategy = FillerFactory.getFillerStrategy(shippingType);
    const filler = fillerStrategy.getFiller(
      packageDuck.getPackagingType(),
      shippingType,
    );

    const order = new Order();
    order.color = color;
    order.size = size;
    order.amountDucks = amountDucks;
    order.destinyCountry = destinyCountry;
    order.shippingType = shippingType;

    const savedOrder = await this.orderRepository.create(order);

    const { total, discounts, increments } = this.priceCalculator.calculate(
      savedOrder,
      packageDuck.getPackagingType(),
      shippingType,
    );

    return new OrderResponseDto(
      savedOrder._id,
      savedOrder.color,
      savedOrder.size,
      savedOrder.amountDucks,
      savedOrder.destinyCountry,
      savedOrder.shippingType,
      packageDuck.getPackagingType(),
      filler,
      total,
      discounts,
      increments,
    );
  }
}

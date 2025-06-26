import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { Order } from '../schemas/order.schema';
import { PackageFactory } from './packaging/packages/package-factory';
import { FillerFactory } from './packaging/fillers/filler-factory';
import { OrderResponseDto } from '../dtos/order-response.dto';
import { PriceCalculatorService } from './price-calculator.service';
import { DuckRepository } from '../../../modules/ducks/repositories/duck.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly priceCalculatorService: PriceCalculatorService,
    private readonly duckRepo: DuckRepository,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const duck = await this.duckRepo.findOne(createOrderDto.duckId);
    if (!duck) throw new NotFoundException('Duck not found');

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

    const savedOrder = await this.orderRepository.create(createOrderDto);

    const { discounts, increments, finalPrice } =
      this.priceCalculatorService.calculate(
        duck.price,
        createOrderDto.amountDucks,
        packageDuck.getPackagingType(),
        createOrderDto.destinyCountry,
        createOrderDto.shippingType,
      );

    return new OrderResponseDto(
      // savedOrder._id,
      savedOrder.color,
      savedOrder.size,
      savedOrder.amountDucks,
      savedOrder.destinyCountry,
      savedOrder.shippingType,
      packageDuck.getPackagingType(),
      filler,
      finalPrice,
      discounts,
      increments,
    );
  }
}

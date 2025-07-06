import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { DuckRepository } from '../../../modules/ducks/repositories/duck.repository';
import { ApplicationExceptions } from '../../../common/exceptions/application.exceptions';
import { OrderEntity } from '../domain/entities/order';
import { DuckEntity } from 'src/modules/ducks/domain/Duck';

@Injectable()
export class OrdersService {
  constructor(
    private exception: ApplicationExceptions,
    private readonly orderRepository: OrderRepository,
    private readonly duckRepo: DuckRepository,
  ) { }

  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const duck: DuckEntity = await this.duckRepo.findById(
      createOrderDto.duckId,
    );
    if (!duck) this.exception.notFoundException('Duck not found');

    const { duckId, size, shippingType, color, amountDucks, destinyCountry } =
      createOrderDto;

    const orderResult = OrderEntity.create({
      duckId,
      color,
      size,
      amountDucks,
      destinyCountry,
      shippingType,
      price: duck.price,
    });

    if (orderResult.isFailure) {
      this.exception.badRequestException('sdsd');
    }

    await this.orderRepository.create(orderResult.value);

    return orderResult.value;
  }
}

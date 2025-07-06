import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { OrderResponseDto } from '../dtos/order-response.dto';
import { OrderEntity } from '../domain/entities/order';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<OrderResponseDto> {
    const order: OrderEntity = await this.ordersService.createOrder({
      ...createOrderDto,
    });

    const orderResponse = new OrderResponseDto(
      order.color,
      order.size,
      order.amountDucks,
      order.destinyCountry,
      order.shippingType,
      order.package.getPackagingType(),
      order.filler,
      order.finalPrice,
      `Descuento aplicado: ${order.discount ?? 0}%`,
      `Incrementos aplicados: ${order.increments ?? 0}%`,
    );

    return orderResponse;
  }

  @Get()
  @HttpCode(200)
  @HttpCode(500)
  async findAll(): Promise<OrderResponseDto[]> {
    return await this.ordersService.findAll();
  }
}

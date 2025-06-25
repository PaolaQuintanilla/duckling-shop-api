import { Body, Controller, Param, Post } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { Order } from '../schemas/order.schema';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/ducks/:duckId')
  async createOrder(
    @Param('duckId') duckId: string,
    @Body() createOrderDto: Omit<CreateOrderDto, 'duckId'>,
  ): Promise<Order> {
    return this.ordersService.createOrder({ ...createOrderDto, duckId });
  }
}

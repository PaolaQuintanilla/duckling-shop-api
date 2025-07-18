import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrderRepository } from './repositories/order.repository';
import { PriceCalculatorService } from './services/price-calculator.service';
import { Duck, DuckSchema } from '../ducks/schemas/duck.schema';
import { DuckRepository } from '../ducks/repositories/duck.repository';
import { ApplicationExceptions } from '../../common/exceptions/application.exceptions';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Duck.name, schema: DuckSchema },
    ]),
  ],
  controllers: [OrdersController],
  providers: [
    ApplicationExceptions,
    OrdersService,
    PriceCalculatorService,
    DuckRepository,
    OrderRepository,
  ],
})
export class OrdersModule {}

import { OrderRepository } from '../repositories/order.repository';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { Order } from '../schemas/order.schema';
import { PriceCalculatorService } from './price-calculator.service';
import { DuckRepository } from '../../../modules/ducks/repositories/duck.repository';
import { ApplicationExceptions } from '../../../common/exceptions/application.exceptions';
export declare class OrdersService {
    private exception;
    private readonly orderRepository;
    private readonly priceCalculatorService;
    private readonly duckRepo;
    constructor(exception: ApplicationExceptions, orderRepository: OrderRepository, priceCalculatorService: PriceCalculatorService, duckRepo: DuckRepository);
    createOrder(createOrderDto: CreateOrderDto): Promise<Order>;
}

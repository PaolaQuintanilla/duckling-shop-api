import { OrdersService } from '../services/orders.service';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { Order } from '../schemas/order.schema';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(duckId: string, createOrderDto: Omit<CreateOrderDto, 'duckId'>): Promise<Order>;
}

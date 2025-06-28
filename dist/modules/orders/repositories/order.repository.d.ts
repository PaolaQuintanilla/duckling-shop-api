import { Model } from 'mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';
export declare class OrderRepository {
    private orderModel;
    constructor(orderModel: Model<OrderDocument>);
    create(orderData: Partial<Order>): Promise<Order>;
}

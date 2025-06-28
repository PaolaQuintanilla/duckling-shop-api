import { Model } from 'mongoose';
import { Duck } from '../schemas/duck.schema';
export declare class DuckRepository {
    private duckModel;
    constructor(duckModel: Model<Duck>);
    create(data: Partial<Duck>): Promise<Duck>;
    findAll(): Promise<Duck[]>;
    findByColorSizeAndPrice(color: string, size: string, price: number): Promise<Duck | null>;
    findById(id: string): Promise<Duck>;
    update(id: string, data: Partial<Duck>): Promise<Duck>;
    updateQuantity(duck: Duck, quantityToAdd: number): Promise<Duck>;
}

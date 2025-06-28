import { FillerStrategy } from './filler-strategy.interface';
export declare class FillerFactory {
    static getFillerStrategy(shippingType: string): FillerStrategy;
}

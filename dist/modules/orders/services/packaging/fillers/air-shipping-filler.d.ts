import { FillerStrategy } from './filler-strategy.interface';
export declare class AirShippingFiller implements FillerStrategy {
    getFiller(packageType: string): string;
}

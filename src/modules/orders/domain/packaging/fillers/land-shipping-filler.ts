import { FillerStrategy } from './filler-strategy.interface';

export class LandShippingFiller implements FillerStrategy {
  getFiller(): string {
    return 'Bolitas de plastoformo';
  }
}

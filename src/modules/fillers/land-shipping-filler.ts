import { FillerStrategy } from './filler-strategy.interface';

export class LandShippingFiller implements FillerStrategy {
  getFiller(shippingType: string): string {
    if (shippingType === 'land') {
      return 'Bolitas de plastoformo';
    }
    return 'Sin relleno';
  }
}

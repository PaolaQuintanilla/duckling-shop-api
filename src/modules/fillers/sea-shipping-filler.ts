import { FillerStrategy } from './filler-strategy.interface';

export class SeaShippingFiller implements FillerStrategy {
  getFiller(packageType: string, shippingType: string): string {
    return 'Bolitas absorbentes de humedad y bolsas con burbuja';
  }
}

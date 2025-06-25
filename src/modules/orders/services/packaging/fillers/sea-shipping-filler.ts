import { FillerStrategy } from './filler-strategy.interface';

export class SeaShippingFiller implements FillerStrategy {
  getFiller(shippingType: string): string {
    if (shippingType === 'sea') {
      return 'Bolitas absorbentes de humedad y bolsas con burbuja';
    }
    return 'Sin relleno';
  }
}

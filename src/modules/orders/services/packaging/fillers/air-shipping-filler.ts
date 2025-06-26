import { FillerStrategy } from './filler-strategy.interface';

export class AirShippingFiller implements FillerStrategy {
  getFiller(packageType: string): string {
    if (packageType === 'wood' || packageType === 'cardboard') {
      return 'Bolitas de plastoformo';
    } else if (packageType === 'plastic') {
      return 'Bolsas con burbuja';
    }
    return 'Sin relleno';
  }
}

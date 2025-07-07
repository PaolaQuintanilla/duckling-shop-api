import { FillerStrategy } from './filler-strategy.interface';

export class AirShippingFiller implements FillerStrategy {
  getFiller(packageType: string): string {
    if (packageType === 'wood' || packageType === 'cardboard') {
      return 'polystyrene beads';
    } else if (packageType === 'plastic') {
      return 'bubble wrap bag';
    }
    return 'Sin relleno';
  }
}

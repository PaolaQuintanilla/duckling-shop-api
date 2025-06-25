import { FillerStrategy } from './filler-strategy.interface';

export class AirShippingFiller implements FillerStrategy {
  getFiller(packageType: string): string {
    if (packageType === 'Madera' || packageType === 'Cartón') {
      return 'Bolitas de plastoformo';
    } else if (packageType === 'Plástico') {
      return 'Bolsas con burbuja';
    }
    return 'Sin relleno';
  }
}

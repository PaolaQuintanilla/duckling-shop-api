import { Package } from './package.interface';

export class CardboardPackage implements Package {
  getPackagingType(): string {
    return 'Cartón';
  }

  getFiller(shippingType: string): string {
    if (shippingType === 'air') {
      return 'Bolitas de plastoformo';
    } else if (shippingType === 'land') {
      return 'Bolitas de plastoformo';
    } else if (shippingType === 'sea') {
      return 'Bolitas absorbentes de humedad y bolsas con burbuja';
    }
    return 'Sin relleno';
  }
}

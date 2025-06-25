import { Package } from './package.interface';

export class PlasticPackage implements Package {
  getPackagingType(): string {
    return 'Plástico';
  }

  getFiller(shippingType: string): string {
    if (shippingType === 'air') {
      return 'Bolsas con burbuja';
    } else if (shippingType === 'land') {
      return 'Bolitas de plastoformo';
    } else if (shippingType === 'sea') {
      return 'Bolitas absorbentes de humedad y bolsas con burbuja';
    }
    return 'Sin relleno';
  }
}

import { Package } from './package.interface';

export class WoodPackage implements Package {
  getPackagingType(): string {
    return 'Madera';
  }

  getFiller(shippingType: string): string {
    if (shippingType === 'air' || shippingType === 'land') {
      return 'Bolitas de plastoformo';
    } else if (shippingType === 'sea') {
      return 'Bolitas absorbentes de humedad y bolsas con burbuja';
    }
    return 'Sin relleno';
  }
}

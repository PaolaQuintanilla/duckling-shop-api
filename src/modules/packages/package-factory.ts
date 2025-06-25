import { Package } from './package.interface';
import { WoodPackage } from './wood-package';
import { CardboardPackage } from './cardboard-package';
import { PlasticPackage } from './plastic-package';

export class PackageFactory {
  static createPackage(size: string): Package {
    switch (size) {
      case 'XLarge':
      case 'Large':
        return new WoodPackage();
      case 'Medium':
        return new CardboardPackage();
      case 'Small':
      case 'Xsmall':
        return new PlasticPackage();
      default:
        throw new Error('Tamaño no válido');
    }
  }
}

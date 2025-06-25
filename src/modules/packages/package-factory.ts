import { Package } from './package.interface';
import { WoodPackage } from './wood-package';
import { CardboardPackage } from './cardboard-package';
import { PlasticPackage } from './plastic-package';
import { SizeEnum } from '../../common/enums/size.enum';

export class PackageFactory {
  static createPackage(size: SizeEnum): Package {
    switch (size) {
      case SizeEnum.XLarge:
      case SizeEnum.Large:
        return new WoodPackage();
      case SizeEnum.Medium:
        return new CardboardPackage();
      case SizeEnum.Small:
      case SizeEnum.XSmall:
        return new PlasticPackage();
      default:
        throw new Error('Tamaño no válido');
    }
  }
}

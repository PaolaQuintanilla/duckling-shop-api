import { Package } from './package.interface';

export class WoodPackage implements Package {
  getPackagingType(): string {
    return 'wood';
  }
}

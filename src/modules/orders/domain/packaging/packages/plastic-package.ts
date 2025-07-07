import { Package } from './package.interface';

export class PlasticPackage implements Package {
  getPackagingType(): string {
    return 'plastic';
  }
}

import { Package } from './package.interface';

export class CardboardPackage implements Package {
  getPackagingType(): string {
    return 'cardboard';
  }
}

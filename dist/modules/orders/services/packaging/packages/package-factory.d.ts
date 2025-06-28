import { Package } from './package.interface';
import { SizeEnum } from '../../../../../common/enums/size.enum';
export declare class PackageFactory {
    static createPackage(size: SizeEnum): Package;
}

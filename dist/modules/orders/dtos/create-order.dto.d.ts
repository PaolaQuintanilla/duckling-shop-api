import { ShippingTypeEnum } from '../../../common/enums/shipping-type.enum';
import { SizeEnum } from '../../../common/enums/size.enum';
export declare class CreateOrderDto {
    duckId: string;
    color: string;
    size: SizeEnum;
    amountDucks: number;
    destinyCountry: string;
    shippingType: ShippingTypeEnum;
}

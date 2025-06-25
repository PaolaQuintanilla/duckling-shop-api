import { ShippingTypeEnum } from '../enums/shipping-type.enum';
import { PriceBreakdown } from './price-breakdown.interface';

export interface IPriceCalculator {
  calculate(
    unitPrice: number,
    quantity: number,
    material: string,
    country: string,
    shippingType: ShippingTypeEnum,
  ): PriceBreakdown;
}

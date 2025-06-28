import { ShippingTypeEnum } from '../../../common/enums/shipping-type.enum';
import { IPriceCalculator } from '../../../common/interfaces/price-calculator.interface';
import { PriceBreakdown } from '../../../common/interfaces/price-breakdown.interface';
export declare class PriceCalculatorService implements IPriceCalculator {
    calculate(unitPrice: number, quantity: number, material: string, country: string, shippingType: ShippingTypeEnum): PriceBreakdown;
}

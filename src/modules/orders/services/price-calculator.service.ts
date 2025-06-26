import { Injectable } from '@nestjs/common';
import { ShippingTypeEnum } from '../../../common/enums/shipping-type.enum';
import { IPriceCalculator } from '../../../common/interfaces/price-calculator.interface';
import { PriceBreakdown } from '../../../common/interfaces/price-breakdown.interface';

@Injectable()
export class PriceCalculatorService implements IPriceCalculator {
  calculate(
    unitPrice: number,
    quantity: number,
    material: string,
    country: string,
    shippingType: ShippingTypeEnum,
  ): PriceBreakdown {
    const basePrice = unitPrice * quantity;
    let total = basePrice;

    let discounts = 0;
    let increments = 0;

    if (quantity > 100) {
      const discount = total * 0.2;
      total -= discount;
      discounts += discount;
    }

    switch (material) {
      case 'wood': {
        const increment = total * 0.05;
        total += increment;
        increments += increment;
        break;
      }
      case 'plastic': {
        const increment = total * 0.1;
        total += increment;
        increments += increment;
        break;
      }
      case 'cardboard': {
        const discount = total * 0.01;
        total -= discount;
        discounts += discount;
        break;
      }
    }

    const countryTaxMap: Record<string, number> = {
      USA: 0.18,
      Bolivia: 0.13,
      India: 0.19,
    };
    const countryTax = countryTaxMap[country] ?? 0.15;
    const countryIncrement = total * countryTax;
    total += countryIncrement;
    increments += countryIncrement;

    switch (shippingType) {
      case ShippingTypeEnum.SEA:
        total += 400;
        increments += 400;
        break;

      case ShippingTypeEnum.LAND: {
        const landFee = 10 * quantity;
        total += landFee;
        increments += landFee;
        break;
      }

      case ShippingTypeEnum.AIR: {
        let airFee = 30 * quantity;
        if (quantity > 1000) {
          const discount = airFee * 0.15;
          airFee -= discount;
          discounts += discount;
        }
        total += airFee;
        increments += airFee;
        break;
      }
    }

    return {
      basePrice: parseFloat(basePrice.toFixed(2)),
      discounts: parseFloat(discounts.toFixed(2)).toString(),
      increments: parseFloat(increments.toFixed(2)).toString(),
      finalPrice: parseFloat(total.toFixed(2)),
    };
  }
}

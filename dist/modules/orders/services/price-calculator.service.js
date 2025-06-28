"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceCalculatorService = void 0;
const common_1 = require("@nestjs/common");
const shipping_type_enum_1 = require("../../../common/enums/shipping-type.enum");
let PriceCalculatorService = class PriceCalculatorService {
    calculate(unitPrice, quantity, material, country, shippingType) {
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
        const countryTaxMap = {
            USA: 0.18,
            Bolivia: 0.13,
            India: 0.19,
        };
        const countryTax = countryTaxMap[country] ?? 0.15;
        const countryIncrement = total * countryTax;
        total += countryIncrement;
        increments += countryIncrement;
        switch (shippingType) {
            case shipping_type_enum_1.ShippingTypeEnum.SEA:
                total += 400;
                increments += 400;
                break;
            case shipping_type_enum_1.ShippingTypeEnum.LAND: {
                const landFee = 10 * quantity;
                total += landFee;
                increments += landFee;
                break;
            }
            case shipping_type_enum_1.ShippingTypeEnum.AIR: {
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
};
exports.PriceCalculatorService = PriceCalculatorService;
exports.PriceCalculatorService = PriceCalculatorService = __decorate([
    (0, common_1.Injectable)()
], PriceCalculatorService);
//# sourceMappingURL=price-calculator.service.js.map
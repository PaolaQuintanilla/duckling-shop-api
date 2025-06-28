"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FillerFactory = void 0;
const air_shipping_filler_1 = require("./air-shipping-filler");
const land_shipping_filler_1 = require("./land-shipping-filler");
const sea_shipping_filler_1 = require("./sea-shipping-filler");
const common_1 = require("@nestjs/common");
class FillerFactory {
    static getFillerStrategy(shippingType) {
        switch (shippingType) {
            case 'air':
                return new air_shipping_filler_1.AirShippingFiller();
            case 'land':
                return new land_shipping_filler_1.LandShippingFiller();
            case 'sea':
                return new sea_shipping_filler_1.SeaShippingFiller();
            default:
                throw new common_1.BadRequestException('Shipping type not supported..');
        }
    }
}
exports.FillerFactory = FillerFactory;
//# sourceMappingURL=filler-factory.js.map
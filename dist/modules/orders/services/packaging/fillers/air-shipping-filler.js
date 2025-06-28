"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirShippingFiller = void 0;
class AirShippingFiller {
    getFiller(packageType) {
        if (packageType === 'wood' || packageType === 'cardboard') {
            return 'Bolitas de plastoformo';
        }
        else if (packageType === 'plastic') {
            return 'Bolsas con burbuja';
        }
        return 'Sin relleno';
    }
}
exports.AirShippingFiller = AirShippingFiller;
//# sourceMappingURL=air-shipping-filler.js.map